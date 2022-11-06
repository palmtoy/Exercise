fn main() {
    let nums = vec![4, 1, 2, 1, 2, 4, 99];
    let ret = majority_element(nums);
    println!("ret = {:?}", ret);
}

pub fn majority_element(nums: Vec<i32>) -> i32 {
    let mut ret = 0;
    for n in nums.iter() {
        ret ^= n;
    }
    ret
}
