export default async function HeapSort(array, setArray, setBarColors, speed) {
    let arr = [...array];
    let n = arr.length;
    let colors = new Array(n).fill("turquoise");
    let delay = 1000 / speed; // Convert speed into a usable delay
  
    async function heapify(arr, n, i) {
      let largest = i;
      let left = 2 * i + 1;
      let right = 2 * i + 2;
  
      if (left < n) {
        colors[left] = "yellow"; // Mark left child
        setBarColors([...colors]);
        await new Promise((resolve) => setTimeout(resolve, delay));
      }
      if (right < n) {
        colors[right] = "yellow"; // Mark right child
        setBarColors([...colors]);
        await new Promise((resolve) => setTimeout(resolve, delay));
      }
  
      if (left < n && arr[left] > arr[largest]) largest = left;
      if (right < n && arr[right] > arr[largest]) largest = right;
  
      if (largest !== i) {
        colors[i] = "red"; // Mark swap
        colors[largest] = "red";
        setBarColors([...colors]);
        await new Promise((resolve) => setTimeout(resolve, delay));
  
        [arr[i], arr[largest]] = [arr[largest], arr[i]];
        setArray([...arr]);
        await new Promise((resolve) => setTimeout(resolve, delay));
  
        await heapify(arr, n, largest);
      }
  
      colors[i] = "blue"; // Reset color after heapify
      setBarColors([...colors]);
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  
    // Build max heap
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
      await heapify(arr, n, i);
    }
  
    // Heap sort process
    for (let i = n - 1; i > 0; i--) {
      colors[0] = "yellow"; // Mark root
      colors[i] = "yellow"; // Mark last element
      setBarColors([...colors]);
      await new Promise((resolve) => setTimeout(resolve, delay));
  
      [arr[0], arr[i]] = [arr[i], arr[0]]; // Swap
      setArray([...arr]);
      await new Promise((resolve) => setTimeout(resolve, delay));
  
      await heapify(arr, i, 0);
  
      colors[i] = "green"; // Mark sorted
      setBarColors([...colors]);
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  
    colors[0] = "green"; // Mark last element as sorted
    setBarColors([...colors]);
  }
  