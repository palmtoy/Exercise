import org.bytedeco.javacv.Blobs;
import org.bytedeco.javacv.CanvasFrame;
import org.bytedeco.javacv.OpenCVFrameConverter;

import javax.swing.*;

import static org.bytedeco.javacpp.opencv_core.*;
import static org.bytedeco.javacpp.opencv_imgcodecs.*;
import static org.bytedeco.javacpp.opencv_imgproc.*;


public class BlobDemo {
	public static void main(String[] args) {
		System.out.println("STARTING ...\n");
		demo();
		System.out.println("ALL DONE.");
	}

	private static void demo() {
		int MinArea = 6;
		int ErodeCount = 0;
		int DilateCount = 0;

		IplImage RawImage = null;

		// Read an image
		RawImage = cvLoadImage("BlackBalls.jpg");
		MinArea = 250;
		ErodeCount = 0;
		DilateCount = 1;

		IplImage GrayImage = cvCreateImage(cvGetSize(RawImage), IPL_DEPTH_8U,1);
		cvCvtColor(RawImage, GrayImage, CV_BGR2GRAY);

		IplImage BWImage = cvCreateImage(cvGetSize(GrayImage), IPL_DEPTH_8U,1);
		cvThreshold(GrayImage, BWImage,127,255, CV_THRESH_BINARY);

		IplImage WorkingImage = cvCreateImage(cvGetSize(BWImage), IPL_DEPTH_8U,1);
		cvErode(BWImage, WorkingImage,null, ErodeCount);
		cvDilate(WorkingImage, WorkingImage,null, DilateCount);

		Blobs Regions = new Blobs();
		Regions.BlobAnalysis(WorkingImage, // image
			-1,-1,  // ROI start col, row
			-1,-1,  // ROI cols, rows
			1,  // border(0 = black; 1 = white)
			 MinArea);  // minarea
		Regions.PrintRegionData();

		for(int i = 1; i <= Blobs.MaxLabel; i++) {
			double [] Region = Blobs.RegionData[i];
			int Parent = (int) Region[Blobs.BLOBPARENT];
			int Color = (int) Region[Blobs.BLOBCOLOR];
			int MinX = (int) Region[Blobs.BLOBMINX];
			int MaxX = (int) Region[Blobs.BLOBMAXX];
			int MinY = (int) Region[Blobs.BLOBMINY];
			int MaxY = (int) Region[Blobs.BLOBMAXY];
			Highlight(RawImage,  MinX, MinY, MaxX, MaxY, 1);
		}

		ShowImage(RawImage,"RawImage",512);

		cvReleaseImage(GrayImage);
		GrayImage = null;

		cvReleaseImage(BWImage);
		BWImage = null;

		cvReleaseImage(WorkingImage);
		WorkingImage = null;

		cvReleaseImage(RawImage);
		RawImage = null;
	}

	private static void ShowImage(IplImage image, String caption, int size) {
		size = Math.max(size, 128);
		@SuppressWarnings("deprecation")
		CvMat mat = image.asCvMat();
		int width = mat.cols();
		width = Math.max(width, 1);
		int height = mat.rows();
		height = Math.max(height, 1);
		double aspect = 1.0 * width / height;
		if(height != size) {
			height = size;
			width = (int)(height * aspect);
		}
		if(width != size) {
			width = size;
		}
		height = (int)(width / aspect);
		ShowImage(image, caption, width, height);
	}

	private static void ShowImage(IplImage image, String caption, int width, int height) {
		CanvasFrame canvas = new CanvasFrame(caption, 1);  // gamma = 1
		canvas.setDefaultCloseOperation(WindowConstants.EXIT_ON_CLOSE);
		canvas.setCanvasSize(width, height);
		OpenCVFrameConverter converter = new OpenCVFrameConverter.ToIplImage();
		canvas.showImage(converter.convert(image));
	}

	private static void Highlight(IplImage image, int xMin, int yMin, int xMax, int yMax, int Thick) {
		CvPoint pt1 = cvPoint(xMin, yMin);
		CvPoint pt2 = cvPoint(xMax, yMax);
		CvScalar color = cvScalar(255,0,0,0);  // blue [green] [red]
		cvRectangle(image, pt1, pt2, color, Thick,4,0);
	}

}

