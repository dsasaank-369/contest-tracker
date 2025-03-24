export default async function MergeSort(array, setArray, setBarColors, speed) {
    console.log("Merge Sort is running...");
    let arr = [...array];
    let colors = new Array(arr.length).fill("turquoise");
    let delay = 1000 / speed; // Convert speed into a usable delay
  
    async function merge(arr, left, mid, right) {
      let leftArr = arr.slice(left, mid + 1);
      let rightArr = arr.slice(mid + 1, right + 1);
      let i = 0,
        j = 0,
        k = left;
  
      while (i < leftArr.length && j < rightArr.length) {
        colors[k] = "yellow"; // Mark elements being compared
        setBarColors([...colors]);
        await new Promise((resolve) => setTimeout(resolve, delay));
  
        if (leftArr[i] <= rightArr[j]) {
          arr[k++] = leftArr[i++];
        } else {
          arr[k++] = rightArr[j++];
        }
        setArray([...arr]);
        await new Promise((resolve) => setTimeout(resolve, delay));
      }
  
      while (i < leftArr.length) {
        colors[k] = "yellow"; // Mark merging elements
        setBarColors([...colors]);
        await new Promise((resolve) => setTimeout(resolve, delay));
  
        arr[k++] = leftArr[i++];
        setArray([...arr]);
        await new Promise((resolve) => setTimeout(resolve, delay));
      }
  
      while (j < rightArr.length) {
        colors[k] = "yellow"; // Mark merging elements
        setBarColors([...colors]);
        await new Promise((resolve) => setTimeout(resolve, delay));
  
        arr[k++] = rightArr[j++];
        setArray([...arr]);
        await new Promise((resolve) => setTimeout(resolve, delay));
      }
    }
  
    async function mergeSort(arr, left, right) {
      if (left < right) {
        let mid = Math.floor((left + right) / 2);
        colors[mid] = "red"; // Mark middle element
        setBarColors([...colors]);
        await new Promise((resolve) => setTimeout(resolve, delay));
  
        await mergeSort(arr, left, mid);
        await mergeSort(arr, mid + 1, right);
        await merge(arr, left, mid, right);
      }
    }
  
    await mergeSort(arr, 0, arr.length - 1);
  
    // Mark sorted elements
    for (let i = 0; i < arr.length; i++) {
      colors[i] = "green";
    }
    setBarColors([...colors]);
  }
  