import static org.junit.Assert.*;

import org.junit.Test;


public class TwoThreeTreeGivenTests
{

   @Test
   public void singleNodeTree()
   {
      TwoThreeTree t = new TwoThreeTree();
      int val = 9;
      t.insert(val);
      String expected = "9";
      
      assertEquals(expected, t.search(val));
      val = 8;
      assertEquals(expected, t.search(val));
      val = 10;
      assertEquals(expected, t.search(val));
      
      val = 15;
      t.insert(val);
      expected = "9 15";
      val = 9;
      assertEquals(expected, t.search(val));
      val = 8;
      assertEquals(expected, t.search(val));
      val = 10;
      assertEquals(expected, t.search(val));
      val = 15;
      assertEquals(expected, t.search(val));
      val = 18;
      assertEquals(expected, t.search(val));

      t = new TwoThreeTree();
      val = 15;
      t.insert(val);
      val = 9;
      t.insert(val);
      val = 9;
      assertEquals(expected, t.search(val));
      val = 8;
      assertEquals(expected, t.search(val));
      val = 10;
      assertEquals(expected, t.search(val));
      val = 15;
      assertEquals(expected, t.search(val));
      val = 18;
      assertEquals(expected, t.search(val));

   }
   
   @Test
   public void oneSplitLeft()
   {
      TwoThreeTree t = new TwoThreeTree();
      t.insert(9);
      t.insert(15);
      t.insert(1);
      
      String expected = "9";
      assertEquals(expected, t.search(9));
      expected = "15";
      assertEquals(expected, t.search(15));
      assertEquals(expected, t.search(17));
      assertEquals(expected, t.search(11));

      expected = "1";
      assertEquals(expected, t.search(1));
      assertEquals(expected, t.search(0));
      assertEquals(expected, t.search(3));
   }
   
   @Test
   public void oneSplitRight()
   {
      TwoThreeTree t = new TwoThreeTree();
      t.insert(1);
      t.insert(9);
      t.insert(15);
      
      String expected = "9";
      assertEquals(expected, t.search(9));
      expected = "15";
      assertEquals(expected, t.search(15));
      assertEquals(expected, t.search(17));
      assertEquals(expected, t.search(11));

      expected = "1";
      assertEquals(expected, t.search(1));
      assertEquals(expected, t.search(0));
      assertEquals(expected, t.search(3));
   }

   @Test
   public void MYTEST() {
	   TwoThreeTree t = new TwoThreeTree();
	      t.insert(10);
	      t.insert(50);
	      t.insert(100);
	      
	      t.insert(2);
	      t.insert(3);
	      t.insert(4);
	      
	      t.insert(5);
	      t.insert(6);
	      assertEquals("6 10", t.search(6));
	      t.insert(7);
	      assertEquals("7 50", t.search(50));
	      
	      t.insert(8);
	      String expected = "8 10";
	      assertEquals(expected, t.search(10));
	      t.insert(9);
	      t.insert(10);
	      t.insert(101);
	      t.insert(100);
	      expected = "100 101";
	      assertEquals(expected, t.search(101));
	      t.insert(1);
	      expected="5 9";
	      assertEquals(expected, t.search(5));
	      t.insert(9);
	      t.insert(15);
	      t.insert(1);
	      t.insert(2);
	      t.insert(3);
	      t.insert(4);
	      t.insert(5);
	      t.insert(6);
	      assertEquals("5 9", t.search(5));
	      assertEquals("8", t.search(8));
	
	   
   }
   @Test
   public void oneSplitMiddle()
   {
      TwoThreeTree t = new TwoThreeTree();
      t.insert(1);
      t.insert(15);
      t.insert(9);
      
      String expected = "9";
      assertEquals(expected, t.search(9));
      expected = "15";
      assertEquals(expected, t.search(15));
      assertEquals(expected, t.search(17));
      assertEquals(expected, t.search(11));

      expected = "1";
      assertEquals(expected, t.search(1));
      assertEquals(expected, t.search(0));
      assertEquals(expected, t.search(3));
   }

   
   @Test
   public void testDuplicates()
   {
      TwoThreeTree t = new TwoThreeTree();
      t.insert(1);
      t.insert(9);
      t.insert(15);
      t.insert(13);
      t.insert(20);
      t.insert(7);
      t.insert(4);
      t.insert(1);
      t.insert(9);
      t.insert(15);
      t.insert(1);
      t.insert(9);
      t.insert(15);
      t.insert(13);
      t.insert(20);
      t.insert(7);
      t.insert(4);
      t.insert(13);
      t.insert(20);
      t.insert(7);
      t.insert(4);

      String expected = "9";
      assertEquals(expected, t.search(9));
      expected = "4";
      assertEquals(expected, t.search(4));
      expected = "15";
      assertEquals(expected, t.search(15));

      expected = "13";
      assertEquals(expected, t.search(12));
      assertEquals(expected, t.search(13));
      assertEquals(expected, t.search(14));
      expected = "20";
      assertEquals(expected, t.search(19));
      assertEquals(expected, t.search(20));
      assertEquals(expected, t.search(21));

      expected = "1";
      assertEquals(expected, t.search(1));
      assertEquals(expected, t.search(0));
      assertEquals(expected, t.search(3));

      expected = "7";
      assertEquals(expected, t.search(6));
      assertEquals(expected, t.search(7));
      assertEquals(expected, t.search(8));

   }


}
