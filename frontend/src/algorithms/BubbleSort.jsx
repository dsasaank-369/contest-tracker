export default async function BubbleSort(array, setArray, setBarColors, speed) {
    let arr = [...array];
    let len = arr.length;
    let colors = new Array(len).fill("turquoise");
    let delay = 1000 / speed; // Convert speed into a usable delay
  
    for (let i = 0; i < len - 1; i++) {
      for (let j = 0; j < len - i - 1; j++) {
        colors[j] = "yellow"; // Highlight comparison
        setBarColors([...colors]);
        await new Promise((resolve) => setTimeout(resolve, delay));
  
        if (arr[j] > arr[j + 1]) {
          colors[j] = "red";
          colors[j + 1] = "red";
          setBarColors([...colors]);
          await new Promise((resolve) => setTimeout(resolve, delay));
  
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]; // Swap
          setArray([...arr]);
          await new Promise((resolve) => setTimeout(resolve, delay));
        }
  
        colors[j] = "blue"; // Reset color
        setBarColors([...colors]);
        await new Promise((resolve) => setTimeout(resolve, delay));
      }
  
      colors[len - i - 1] = "green"; // Mark last sorted element
      setBarColors([...colors]);
      await new Promise((resolve) => setTimeout(resolve, delay));
    }
  
    colors[0] = "green"; // Mark final sorted element
    setBarColors([...colors]);
  }
  