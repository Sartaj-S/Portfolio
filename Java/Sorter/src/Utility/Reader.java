package Utility;

import java.util.*;
import java.io.File;
import java.io.FileNotFoundException;

public class Reader{
    private List<String> fnames = new ArrayList<String>(20);

    public Reader(String[] names){
        try{
            for(int i =0; i<names.length; i++){
                fnames.add(names[i]);
            }
        }   catch(Exception e){
            System.out.println("No files entered, please enter file names during cmd line execution.");
        }
    }

    public void addFile(String name){
        fnames.add(name);
    }
    
    public List<String> getFileNames(){
        return fnames;
    }

    public List<List<Integer>> getNums(){
        ListIterator<String> iter = fnames.listIterator();
        List<List<Integer>> numberColl = new ArrayList<List<Integer>>();

        while (iter.hasNext()){
            String curr = iter.next();

            try{
                File currFile = new File(curr);
                Scanner currReader = new Scanner(currFile);
                List<Integer> currNums = new ArrayList<Integer>();

                while(currReader.hasNextLine()){
                    currNums.add(Integer.parseInt(currReader.nextLine()));
                }

                numberColl.add(currNums);
                currReader.close();
            }
            catch (FileNotFoundException e){
                System.out.printf("Error! File: %s was not found\n Please make sure they are in the project folder \n",curr);
                
            }

        }

        return numberColl;

    }

}