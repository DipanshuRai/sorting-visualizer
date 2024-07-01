import React, { useEffect } from 'react';

const SelectionSort = ({ array, setArray, algoSpeed, setIsSorting }) => {

    const updateColor=(index,color)=>{
        document.getElementsByClassName('array-bar')[index].style.backgroundColor = color;
    }

    useEffect(() => {
        document.getElementById("Time_Worst").innerText = "O(N^2)";
        document.getElementById("Time_Average").innerText = "Θ(N^2)";
        document.getElementById("Time_Best").innerText = "Ω(N^2)";
        document.getElementById("Space_Worst").innerText = "O(1)";

        const selectionSort = async () => {
            const n = array.length;
            const arrayCopy = [...array];

            for (let i = 0; i < n - 1; i++) {
                let minIndex = i;
                updateColor(i,"red");
                for (let j = i + 1; j < n; j++) {
                    updateColor(j,"yellow");
                    await new Promise((resolve) => setTimeout(resolve, (5 - algoSpeed) * 100));
                    if (arrayCopy[j] < arrayCopy[minIndex]) {
                        if (minIndex !== i)
                            updateColor(minIndex,"blue");
                        minIndex = j;
                        updateColor(minIndex,"red");
                    } 
                    else 
                        updateColor(j,"blue");
                }
                if (minIndex !== i) {
                    [arrayCopy[i], arrayCopy[minIndex]] = [arrayCopy[minIndex], arrayCopy[i]];
                    setArray([...arrayCopy]);
                    await new Promise((resolve) => setTimeout(resolve, (5 - algoSpeed) * 100));
                }
                updateColor(minIndex,"blue");
                updateColor(i,"green");
            }
            arrayCopy.forEach((_, idx) => {
                updateColor(idx,"green");
            });
            setIsSorting(false);
        };
        selectionSort();
        return () => setIsSorting(false);
    }, [array, setArray, algoSpeed, setIsSorting]);
    return null;
};

export default SelectionSort;