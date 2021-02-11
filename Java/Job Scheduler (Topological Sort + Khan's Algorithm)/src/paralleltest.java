import static org.junit.Assert.*;

import org.junit.Before;
import org.junit.Test;

public class paralleltest {

	@Before
	public void setUp() throws Exception {
	}

	@Test
	public void test() {
		JobSchedule s = new JobSchedule();
		s.addJob(5);//0
		s.addJob(5);//1
		s.addJob(10);//2
		s.addJob(1);//3
		s.addJob(3);//4
		s.addJob(2);//5
		s.addJob(15);//6

		s.get(1).requires(s.get(0));
		s.get(2).requires(s.get(1));
		s.get(3).requires(s.get(2));
		s.get(3).requires(s.get(6));
		s.get(6).requires(s.get(5));
		s.get(5).requires(s.get(4));

		assertEquals(20, s.get(3).getStartTime());
		
		s.get(1).requires(s.get(5));
		assertEquals(20, s.get(3).getStartTime());

		s.get(4).requires(s.get(1));
		assertEquals(-1, s.get(3).getStartTime());

	}
	

}
