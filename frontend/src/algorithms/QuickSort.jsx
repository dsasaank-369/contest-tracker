export default async function QuickSort(array, setArray, setBarColors, speed) {
  let arr = [...array];
  let colors = new Array(arr.length).fill("turquoise");
  let delay = 1000 / speed; // Convert speed into a usable delay

  async function partition(arr, low, high) {
    let pivot = arr[high];
    let i = low - 1;

    colors[high] = "yellow"; // Mark pivot
    setBarColors([...colors]);
    await new Promise((resolve) => setTimeout(resolve, delay));

    for (let j = low; j < high; j++) {
      colors[j] = "red"; // Mark current comparison
      setBarColors([...colors]);
      await new Promise((resolve) => setTimeout(resolve, delay));

      if (arr[j] < pivot) {
        i++;
        [arr[i], arr[j]] = [arr[j], arr[i]];
        setArray([...arr]);
        await new Promise((resolve) => setTimeout(resolve, delay));
      }
      colors[j] = "turquoise"; // Reset color
    }

    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]]; // Swap pivot
    setArray([...arr]);
    await new Promise((resolve) => setTimeout(resolve, delay));

    colors[high] = "turquoise"; // Reset pivot color
    colors[i + 1] = "green"; // Mark sorted
    setBarColors([...colors]);

    return i + 1;
  }

  async function quickSort(arr, low, high) {
    if (low < high) {
      let pi = await partition(arr, low, high);
      await quickSort(arr, low, pi - 1);
      await quickSort(arr, pi + 1, high);
    }
  }

  await quickSort(arr, 0, arr.length - 1);

  // Mark entire array as sorted
  for (let i = 0; i < arr.length; i++) {
    colors[i] = "green";
  }
  setBarColors([...colors]);
}
