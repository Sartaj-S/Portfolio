import java.util.*;
public class JobSchedule {
	private ArrayList<Job> schedule = new ArrayList<Job>(100);
	protected boolean isSorted = false;
	private int minCompletionTime=0;
	public JobSchedule() {
		
	}
	
	public Job addJob(int time) {
		Job newJob = new Job(time);
		schedule.add(newJob);
		if(newJob.time>minCompletionTime)
			minCompletionTime=newJob.time;
		return newJob;
	}
	
	public Job getJob(int index) {
		return schedule.get(index);
	}
	public Queue <Job> topSort() {
		if(!isSorted)
			resetGraph();
		Queue <Job> q = new LinkedList <Job> ();
		Queue <Job> ret = new LinkedList <Job> ();
		for(Job u : schedule) {
			if(u.inDegree==0) {
				u.startTime=0;
				q.add(u);
				ret.add(u);
			}
		}
		while(!q.isEmpty()) {
			Job u=q.poll();
			for(Job r : u.outgoingedges) {
				r.decrement();
				if(r.inDegree==0) {
					q.add(r);
					ret.add(r);
				}
			}
		}
		isSorted = true;
		return ret;
		
	}
	public void setStartTimes(Queue<Job> q) {
		if(q.size()!=schedule.size())
			minCompletionTime=-1;
		while(!q.isEmpty()) {
			Job e = q.poll();
			if(e.reqs.size()==0) {
				e.setStartT(0);
			}
			else if(e.inDegree==0){
				for(Job req : e.reqs) {
					if((req.startTime+req.time)>e.startTime)
						e.setStartT(req.startTime+req.time);
						if (e.startTime+e.time>minCompletionTime && minCompletionTime!=-1)
							minCompletionTime=e.startTime+e.time;
				}
			}
			else {
				minCompletionTime=-1;
			}
		}
		isSorted = true;
	}
	
	//returns minimum completion time for ALL nodes in the schedule.
	public int minCompletionTime() {
		if(!isSorted)
			setStartTimes(topSort());
		return minCompletionTime;
	}
	
	//unvisits all nodes
	public void resetGraph() {
		for( Job j : schedule) {
			j.resetInDegree();
			j.setStartT(-1);
		}
	}
	
	public Job get(int index) {
		return schedule.get(index);
	}
	
	// / / / / / / / / / J O B     C L A S S / / / / / / / / / //
	public class Job {
		//private String label;
		private int inDegree = 0;
		private int time;
		private ArrayList <Job> reqs = new ArrayList<Job>(100);
		private ArrayList <Job> outgoingedges = new ArrayList<Job>(100);
		private int startTime=-1;
		
		private Job() {
		}
		private Job(int time) {
			this.time = time;
		}
		private void setStartT(int startTime) {
			this.startTime = startTime;
		}
		private void decrement() {
			inDegree--;
		}
		private void resetInDegree() {
			inDegree = reqs.size();
		}
		private void addReq(Job e) {
			outgoingedges.add(e);
		}		
		public void requires (Job j) {
			reqs.add(j);
			j.addReq(this);
			inDegree++;
			isSorted=false;
			if(j.startTime+j.time<this.startTime)
				isSorted=true;
		}
		public int getStartTime() {
			if(!isSorted) {
			setStartTimes(topSort());
			}
			return startTime;
		}
		
	}
	// / / / / / / / / / / E N D     J O B   C L A S S / / / / / / //
	
}
// / / / / / / / / / E N D   J O B     S C H E D U L E R / / / / / / //