package Utility;

import java.util.*;
public class Menu {

    //entry: begin options
    private String[] options = 
    {
    "\n---------------------\n",
    "Options:\n",
    "(1) Print All Numbers\n",
    "(2) Add File\n",
    "(3) Bubble Sort\n",
    "(4) Insertion Sort\n",
    "(5) Quick Sort\n",
    "(0) Quit\n",
    "\nPlease press corresponding number:  "
    };
    //end options

    public void showMenu(String[] fnames){
        boolean inMenu = true;
        Scanner scanner = new Scanner(System.in);
        Reader reader = new Reader(fnames);
        List<List<Integer>> numbers = reader.getNums();
        Sorter sorter = new Sorter();
        while (inMenu){
            printOptions();
            String entry = scanner.nextLine();

            switch(entry){
                case "1":
                printNumbers(reader.getFileNames(), numbers);
                    break;
                case "2":
                System.out.println("Please enter new file name:\n");
                String name = scanner.nextLine();
                System.out.println("\nThank you.\n");
                reader.addFile(name);
                numbers = reader.getNums();
                    break;
                case "3":
                sorter.bubbleSort(numbers);
                    break;
                case "4":
                sorter.insertionSort(numbers);
                    break;
                case "5":
                sorter.quickSort(numbers);
                    break;
                case "0":
                inMenu = false;
                    break;
                default:
                System.out.println("Error! Invalid entry, please try again!");
                    break;


            }
        }
        scanner.close();
    }
    //prints all options from the above array
    public void printOptions(){
        for(int i = 0; i < options.length; i++){
            System.out.print(options[i]);
        }
    }

    //prints all numbers for each file collection (sorted or unsroted, whichever collection is given)
    public void printNumbers(List<String> fnames,List<List<Integer>> numbers){
        for(int i = 0; i < fnames.size(); i++){
            System.out.println("** NUMBERS FOR: " + fnames.get(i) + " **");

            for( Integer number : numbers.get(i)){
                System.out.println(number);
            }
        }
    }
}
