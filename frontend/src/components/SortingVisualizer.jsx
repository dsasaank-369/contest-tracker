import React, { useState, useEffect } from "react";
import BubbleSort from "../algorithms/BubbleSort";
import SelectionSort from "../algorithms/SelectionSort";
import InsertionSort from "../algorithms/InsertionSort";
import MergeSort from "../algorithms/MergeSort";
import QuickSort from "../algorithms/QuickSort";
import HeapSort from "../algorithms/HeapSort";
import "./SortingVisualizer.css";

function SortingVisualizer() {
  const [array, setArray] = useState([]);
  const [barColors, setBarColors] = useState([]);
  const [size, setSize] = useState(150);
  const [speed, setSpeed] = useState(1000);
  const [algorithm, setAlgorithm] = useState("MergeSort");
  const [isSorting, setIsSorting] = useState(false);
  const [sortedArray, setSortedArray] = useState([]);
  const [complexity, setComplexity] = useState({
    time: "",
    space: "",
  });

  useEffect(() => {
    generateArray();
  }, [size]);

  // Mapping algorithms to their complexities
  const algorithmComplexities = {
    BubbleSort: { time: "O(N²) | Θ(N²) | Ω(N)", space: "O(1)" },
    SelectionSort: { time: "O(N²) | Θ(N²) | Ω(N²)", space: "O(1)" },
    InsertionSort: { time: "O(N²) | Θ(N²) | Ω(N)", space: "O(1)" },
    MergeSort: { time: "O(N log N) | Θ(N log N) | Ω(N log N)", space: "O(N)" },
    QuickSort: { time: "O(N²) | Θ(N log N) | Ω(N log N)", space: "O(log N)" },
    HeapSort: { time: "O(N log N) | Θ(N log N) | Ω(N log N)", space: "O(1)" },
  };

  const generateArray = () => {
    if (isSorting) return;
    const newArray = Array.from({ length: size }, () =>
      Math.floor(Math.random() * 90) + 10
    );
    setArray(newArray);
    setSortedArray([]);
    setBarColors(new Array(size).fill("turquoise"));
    setComplexity({ time: "", space: "" }); // Reset complexities
  };

  const runAlgorithm = async () => {
    if (isSorting) return;
    setIsSorting(true);

    // Update complexities before running the algorithm
    setComplexity(algorithmComplexities[algorithm]);

    if (sortedArray.length > 0) {
      setArray([...sortedArray]);
    }

    switch (algorithm) {
      case "BubbleSort":
        await BubbleSort(array, setArray, setBarColors, speed);
        break;
      case "SelectionSort":
        await SelectionSort(array, setArray, setBarColors, speed);
        break;
      case "InsertionSort":
        await InsertionSort(array, setArray, setBarColors, speed);
        break;
      case "MergeSort":
        await MergeSort(array, setArray, setBarColors, speed);
        break;
      case "QuickSort":
        await QuickSort(array, setArray, setBarColors, speed);
        break;
      case "HeapSort":
        await HeapSort(array, setArray, setBarColors, speed);
        break;
      default:
        break;
    }

    setSortedArray([...array]);
    setIsSorting(false);
  };

  return (
    <div className="sorting-component">
      <h1 className="title">Sorting Visualizer</h1>
      <nav>
        <div className="controls">
          <label>Size:</label>
          <input
            type="range"
            min="20"
            max="200"
            value={size}
            onChange={(e) => setSize(Number(e.target.value))}
            disabled={isSorting}
          />
          <label>Speed:</label>
          <input
            type="range"
            min="10"
            max="1000"
            value={speed}
            onChange={(e) => setSpeed(Number(e.target.value))}
            disabled={isSorting}
          />
          <label>Algorithm:</label>
          <select
            onChange={(e) => setAlgorithm(e.target.value)}
            disabled={isSorting}
          >
            <option value="MergeSort">Merge Sort</option>
            <option value="SelectionSort">Selection Sort</option>
            <option value="InsertionSort">Insertion Sort</option>
            <option value="BubbleSort">Bubble Sort</option>
            <option value="QuickSort">Quick Sort</option>
            <option value="HeapSort">Heap Sort</option>
          </select>
          <button onClick={generateArray} disabled={isSorting} className="">
            Generate New Array
          </button>
          <button onClick={runAlgorithm} disabled={isSorting}>
            Run
          </button>
        </div>
      </nav>

      {/* Space Complexity on Left & Time Complexity on Right */}
      <div className="complexity-container">
        <div className="space-complexity">
          <h3>Space Complexity:</h3>
          <p>{complexity.space || "-"}</p>
        </div>
        <div className="time-complexity">
          <h3>Time Complexity:</h3>
          <p>{complexity.time || "-"}</p>
        </div>
      </div>

      <section className="array-container">
        {array.map((value, idx) => (
          <div
            key={idx}
            className="array-bar"
            style={{ height: `${value}%`, backgroundColor: barColors[idx] }}
          ></div>
        ))}
      </section>
    </div>
  );
}

export default SortingVisualizer;
