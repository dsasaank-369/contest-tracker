export default async function InsertionSort(array, setArray, setBarColors, speed) {
    console.log("Insertion Sort is running...");
    let arr = [...array];
    let len = arr.length;
    let colors = new Array(len).fill("turquoise");
    let delay = 1000 / speed; // Convert speed into a usable delay
  
    for (let i = 1; i < len; i++) {
      let key = arr[i];
      let j = i - 1;
      colors[i] = "yellow"; // Mark the key element
      setBarColors([...colors]);
      await new Promise((resolve) => setTimeout(resolve, delay));
  
      while (j >= 0 && arr[j] > key) {
        colors[j] = "red"; // Mark comparison
        setBarColors([...colors]);
        await new Promise((resolve) => setTimeout(resolve, delay));
  
        arr[j + 1] = arr[j]; // Shift elements
        setArray([...arr]);
        await new Promise((resolve) => setTimeout(resolve, delay));
  
        colors[j] = "blue"; // Reset color
        setBarColors([...colors]);
  
        j = j - 1;
      }
      arr[j + 1] = key;
      setArray([...arr]);
      await new Promise((resolve) => setTimeout(resolve, delay));
  
      colors[i] = "green"; // Mark sorted element
      setBarColors([...colors]);
    }
  
    // Ensure all elements are marked as sorted
    for (let k = 0; k < len; k++) {
      colors[k] = "green";
    }
    setBarColors([...colors]);
  }
  