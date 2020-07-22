export function findTarget(nums: number[], target: number): number[] | undefined {
  for (let i = 0; i < nums.length; i++) {
    for (let j = 0; j < nums.length; j++) {
      if (nums[j] + nums[i] === target && i !== j) {
        return [i, j]
      }
    }
  }
}

export function anotherWay(nums: number[], target: number): number[] | undefined {
  for (let i = 0; i < nums.length; i++) {
    const j = nums.indexOf(target - nums[i])
    if (j !== -1 && i !== j) {
      return [i, j]
    }
  }
}