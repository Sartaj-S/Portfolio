package Testing;

import org.junit.Test;
import java.util.*;
import static org.junit.Assert.assertEquals;
import Utility.*;

public class tests1 {
    private Sorter sorter = new Sorter();

    //tests that the Reader is able to correctly read numbers from a multiple files
    @Test
    public void test_numberReads(){
        String[] args = {"/Users/sartaj/Desktop/Current Projects/Java - Sorter/Sorter/lib/test_1.txt","/Users/sartaj/Desktop/Current Projects/Java - Sorter/Sorter/lib/test_2.txt"};
        Reader testReader = new Reader(args);
        List<List<Integer>> readNums = testReader.getNums();

        List<Integer> test1Nums = readNums.get(0);
        for (int i = 0; i < test1Nums.size();i++){
            assertEquals(i, test1Nums.get(i).intValue());
        }
        List<Integer> test2Nums = readNums.get(1);
        for (int i = test2Nums.size(); i > 0;i--){
            assertEquals(i, test1Nums.get(i).intValue());
        }         
    }

    //tests correctness of bubblesort on a reverse ordered list
    @Test
    public void test_bubbleSort(){
        String [] args = {"/Users/sartaj/Desktop/Current Projects/Java - Sorter/Sorter/lib/test_2.txt"};
        Reader testReader = new Reader(args);
        List<List<Integer>> readNums = testReader.getNums();
        sorter.bubbleSort(readNums);
        List<Integer> test1Nums = readNums.get(0);
        for (int i = 0; i < test1Nums.size();i++){
            assertEquals(i+1, test1Nums.get(i).intValue());
        }
    }

    //tests correctness of insertionSort
    @Test
    public void test_insertionSort(){
        String[] args = {"/Users/sartaj/Desktop/Current Projects/Java - Sorter/Sorter/lib/test_3.txt"};
        Reader testReader = new Reader(args);
        List<List<Integer>> readNums = testReader.getNums();
        sorter.insertionSort(readNums);
        List<Integer> test1Nums = readNums.get(0);
        for (int i = 0; i < test1Nums.size();i++){
            assertEquals(i+1, test1Nums.get(i).intValue());
        }
    }

    //tests correctness of quicksort
    @Test
    public void test_quickSort(){
        String[] args = {"/Users/sartaj/Desktop/Current Projects/Java - Sorter/Sorter/lib/test_3.txt"};
        Reader testReader = new Reader(args);
        List<List<Integer>> readNums = testReader.getNums();
        sorter.quickSort(readNums);
        List<Integer> test1Nums = readNums.get(0);
        for (int i = 0; i < test1Nums.size();i++){
            assertEquals(i+1, test1Nums.get(i).intValue());
        }
    }

}
