'''
    http://warmspringwinds.github.io/tensorflow/tf-slim/2016/12/21/tfrecords-guide/
'''

import numpy as np
import cv2
import matplotlib.pyplot as plt
import tensorflow as tf

cat_img = cv2.imread('./image/cat.jpg')
'''
print('Show origin image ...')
plt.imshow(cv2.cvtColor(cat_img, cv2.COLOR_BGR2RGB))
plt.show()
'''

# Let's convert the picture into string representation
# using the ndarray.tostring() function
cat_string = cat_img.tostring()

# Now let's convert the string back to the image
# Important: the dtype should be specified
# otherwise the reconstruction will be errorness
# Reconstruction is 1d, so we need sizes of image
# to fully reconstruct it.
reconstructed_cat_1d = np.fromstring(cat_string, dtype=np.uint8)

# Here we reshape the 1d representation
# This is the why we need to store the sizes of image
# along with its serialized representation.
reconstructed_cat_img = reconstructed_cat_1d.reshape(cat_img.shape)
print('cat_img.shape = ' + str(cat_img.shape))
'''
print('Show reconstructed image ...')
plt.imshow(cv2.cvtColor(reconstructed_cat_img, cv2.COLOR_BGR2RGB))
plt.show()
'''

# Let's check if we got everything right and compare
# reconstructed array to the original one.
print(np.allclose(cat_img, reconstructed_cat_img))
##########################################################################

filename_pairs = [
    ('image/JPEGImages/cumputer.jpg',
     'image/SegmentationClass/cumputer.png'),
    ('image/JPEGImages/dog.jpg',
     'image/SegmentationClass/dog.png'),
    ('image/JPEGImages/plane.jpg',
     'image/SegmentationClass/plane.png')
]


def _bytes_feature(value):
    return tf.train.Feature(bytes_list=tf.train.BytesList(value=[value]))


def _int64_feature(value):
    return tf.train.Feature(int64_list=tf.train.Int64List(value=[value]))


tfrecords_filename = 'pascal_voc_segmentation.tfrecords'

writer = tf.python_io.TFRecordWriter(tfrecords_filename)

# Let's collect the real images to later on compare
# to the reconstructed ones
original_images = []

for img_path, annotation_path in filename_pairs:

    img = np.array(cv2.imread(img_path))
    annotation = np.array(cv2.imread(annotation_path))

    # The reason to store image sizes was demonstrated
    # in the previous example -- we have to know sizes
    # of images to later read raw serialized string,
    # convert to 1d array and convert to respective
    # shape that image used to have.
    height = img.shape[0]
    width = img.shape[1]
    print('height = %s, width = %s' % (height, width))

    # Put in the original images into array
    # Just for future check for correctness
    original_images.append((img, annotation))

    img_raw = img.tostring()
    annotation_raw = annotation.tostring()

    example = tf.train.Example(features=tf.train.Features(feature={
        'height': _int64_feature(height),
        'width': _int64_feature(width),
        'image_raw': _bytes_feature(img_raw),
        'mask_raw': _bytes_feature(annotation_raw)}))

    writer.write(example.SerializeToString())

writer.close()
##########################################################################

reconstructed_images = []

record_iterator = tf.python_io.tf_record_iterator(path=tfrecords_filename)

for string_record in record_iterator:
    example = tf.train.Example()
    example.ParseFromString(string_record)

    height = int(example.features.feature['height']
                                 .int64_list
                                 .value[0])

    width = int(example.features.feature['width']
                                .int64_list
                                .value[0])

    img_string = (example.features.feature['image_raw']
                                  .bytes_list
                                  .value[0])

    annotation_string = (example.features.feature['mask_raw']
                                .bytes_list
                                .value[0])

    img_1d = np.fromstring(img_string, dtype=np.uint8)
    reconstructed_img = img_1d.reshape((height, width, -1))

    # Annotations also have depth (3rd dimension)
    annotation_1d = np.fromstring(annotation_string, dtype=np.uint8)
    reconstructed_annotation = annotation_1d.reshape((height, width, -1))

    reconstructed_images.append((reconstructed_img, reconstructed_annotation))
##########################################################################

# Let's check if the reconstructed images match
# the original images
print
for original_pair, reconstructed_pair in zip(original_images, reconstructed_images):
    img_pair_to_compare, annotation_pair_to_compare = zip(
        original_pair, reconstructed_pair)
    print(np.allclose(*img_pair_to_compare))
    print(np.allclose(*annotation_pair_to_compare))
##########################################################################
