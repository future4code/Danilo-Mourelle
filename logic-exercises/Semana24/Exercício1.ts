export const arrayRotation = (nums: number[], k: number): number[] => {
  let newArray: number[] = []
  for (let index = nums.length - k; index < nums.length; index++) {
    newArray.push(nums[index])

  }
  for (let index = 0; index < nums.length - k; index++) {
    newArray.push(nums[index])

  }
  return newArray
}