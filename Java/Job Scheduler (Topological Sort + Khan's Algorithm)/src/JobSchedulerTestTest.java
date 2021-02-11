import static org.junit.Assert.*;

import org.junit.Before;
import org.junit.Test;

public class JobSchedulerTestTest {

	@Before
	public void setUp() throws Exception {
	}

	@Test
	public void test() {
		JobSchedule schedule = new JobSchedule();
		schedule.addJob(8);
		JobSchedule.Job j1 = schedule.addJob(3);
		schedule.addJob(5);
		schedule.get(0).requires(schedule.get(2));

		assertEquals(13, schedule.minCompletionTime());
		schedule.get(0).requires(schedule.get(1));

		assertEquals(13, schedule.minCompletionTime());
		assertEquals(5, schedule.get(0).getStartTime());
		assertEquals(0, j1.getStartTime());
		assertEquals(0, schedule.get(2).getStartTime());
		j1.requires(schedule.get(2));

		assertEquals(16, schedule.minCompletionTime());
		assertEquals(8, schedule.get(0).getStartTime());
		assertEquals(5, schedule.get(1).getStartTime());
		assertEquals(0, schedule.get(2).getStartTime());
		schedule.get(1).requires(schedule.get(0));

		assertEquals(-1, schedule.minCompletionTime());
		assertEquals(-1, schedule.get(0).getStartTime());
		assertEquals(-1, schedule.get(1).getStartTime());
		assertEquals(0, schedule.get(2).getStartTime());
		
		JobSchedule sched = new JobSchedule();
		sched.addJob(3);//0
		sched.addJob(9);//1
		sched.addJob(40);//2
		sched.addJob(10);//3
		sched.addJob(20);//4
		sched.addJob(30);//5
		sched.addJob(8);//6
		
		sched.get(1).requires(sched.get(0));
		sched.get(2).requires(sched.get(1));
		sched.get(3).requires(sched.get(1));
		sched.get(4).requires(sched.get(3));
		sched.get(5).requires(sched.get(4));
		sched.get(6).requires(sched.get(5));
		sched.get(6).requires(sched.get(0));

		assertEquals(0, sched.get(0).getStartTime());
		assertEquals(3, sched.get(1).getStartTime());
		assertEquals(12, sched.get(2).getStartTime());
		assertEquals(12, sched.get(3).getStartTime());
		assertEquals(22, sched.get(4).getStartTime());
		assertEquals(42, sched.get(5).getStartTime());
		assertEquals(72, sched.get(6).getStartTime());
		
		sched.addJob(10);//7

		sched.get(0).requires(sched.get(7));

		assertEquals(10, sched.get(0).getStartTime());

		
		
	}
	

}


