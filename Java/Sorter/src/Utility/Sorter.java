package Utility;
import java.util.List;
public class Sorter implements Sorting{

    public void bubbleSort(List<List<Integer>> inpList){

        for(int x = 0; x < inpList.size(); x++){

            List<Integer> currNums = inpList.get(x);
            int n = currNums.size();

            for (int i = 0; i < n; i++){

                for (int j = 1 ; j < n-i; j++){
                    if (currNums.get(j-1) > currNums.get(j)){
                        int curr = currNums.get(j);
                        currNums.set(j, currNums.get(j-1));
                        currNums.set(j-1, curr);
                    }
        
                }
            }
        }
    } 
    //end insertion sort

    public void insertionSort(List<List<Integer>> inpList){
        for(int x = 0; x < inpList.size(); x++){
            List<Integer> currNums = inpList.get(x);

            for (int i = 1; i < currNums.size(); i++){

                int key = currNums.get(i);
                int j = i-1;

                while ( (j >= 0) && (currNums.get(j) > key) ){
                    currNums.set(j+1, currNums.get(j));
                    j--;
                }
                currNums.set(j+1, key);
                
            }
        }
    }
    //end insertion sort
    public void quickSort(List<List<Integer>> inpList){
        for(int x = 0; x < inpList.size(); x++){
            List<Integer> currNums = inpList.get(x);
            quickSorting(currNums, 0, currNums.size()-1);
        }
        
    }
    //end quick sort

    public void quickSorting(List<Integer> inpList, int lo, int hi){

        if (lo < hi){
            int partitionIndex = partition(inpList, lo, hi);

            quickSorting(inpList,lo,partitionIndex-1);
            quickSorting(inpList, partitionIndex+1, hi);
        }

    }

    public int partition(List<Integer> inpList, int lo, int hi){

        int pivot = inpList.get(hi);
        int indexLo = lo-1;

        for (int i = lo; i < hi; i++){

            if (inpList.get(i) < pivot){
                indexLo++;
                int temp = inpList.get(indexLo);
                inpList.set(indexLo, inpList.get(i));
                inpList.set(i, temp);
            }
        }

        int temp = inpList.get(indexLo+1);
        inpList.set(indexLo+1, pivot);
        inpList.set(hi, temp);

        return indexLo+1;
    }
}