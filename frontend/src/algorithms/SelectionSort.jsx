export default async function SelectionSort(array, setArray, setBarColors, speed) {
    let arr = [...array];
    let len = arr.length;
    let colors = new Array(len).fill("turquoise");
    let delay = 1000 / speed; // Convert speed into a usable delay
  
    for (let i = 0; i < len - 1; i++) {
      let minIndex = i;
      colors[i] = "red"; // Mark current element
      setBarColors([...colors]);
      await new Promise((resolve) => setTimeout(resolve, delay));
  
      for (let j = i + 1; j < len; j++) {
        colors[j] = "yellow"; // Mark comparison
        setBarColors([...colors]);
        await new Promise((resolve) => setTimeout(resolve, delay));
  
        if (arr[j] < arr[minIndex]) {
          if (minIndex !== i) colors[minIndex] = "turquoise"; // Reset previous min
          minIndex = j;
          colors[minIndex] = "blue"; // Mark new minimum
          setBarColors([...colors]);
          await new Promise((resolve) => setTimeout(resolve, delay));
        }
        colors[j] = "turquoise"; // Reset comparison color
      }
  
      // Swap elements
      if (minIndex !== i) {
        colors[i] = "red"; 
        colors[minIndex] = "red";
        setBarColors([...colors]);
        await new Promise((resolve) => setTimeout(resolve, delay));
  
        [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
        setArray([...arr]);
        await new Promise((resolve) => setTimeout(resolve, delay));
      }
  
      colors[i] = "green"; // Mark sorted element
      setBarColors([...colors]);
    }
  
    colors[len - 1] = "green"; // Mark last element as sorted
    setBarColors([...colors]);
  }
  