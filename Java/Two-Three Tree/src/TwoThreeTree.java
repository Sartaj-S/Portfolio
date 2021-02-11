import java.util.ArrayList;

public class TwoThreeTree {
	private Node root;
	
	public TwoThreeTree() {
		root = new Node();
	}
	
	public boolean insert (int x) {
		 Node dest = root.traverse (root, x);
		 
		if (dest.dupCheck(x))
			return false;
		else {
			dest.addKey(x);
			if(dest.full())
				dest=dest.balance();
			if(dest.parent()==null)
				root=dest;
			return true;
		}
	}
	public String search(int x) {
		return root.search(x);
	}
	
	

	
	
	
	
	class Node {
		private ArrayList<Integer> keys = new ArrayList<Integer>(3);
		private Node parent;
		private ArrayList<Node> children = new ArrayList<Node>(4);
		
		private Node() {
			parent = null;
		}

		private Node parent() {
			return parent;
		}
		
		//get child at [index]
		private Node child(int index) {
			return children.get(index);
		}
		
		//get key at [index]
		private int key(int index) {
			return keys.get(index);
		}
		
		//check to see if node is full
		private boolean full() {
			if (keys.size()==3)
				return true;
			else
				return false;
		}

		private String search(int x) {
			Node dest = traverse(this, x);
			String output = new String();
			if(dest.keys.size()==1)
				return String.valueOf(dest.key(0));
			else if(dest.keys.size()==2) {
				String key1 = Integer.toString(dest.key(0));
				String key2 = Integer.toString(dest.key(1));
				output=output.concat(key1+" "+ key2);
			}
			return output;
		}
		
		private void adopt(Node child) {
			children.add(child);
			child.setParent(this);
			
		}
		private void adopt(int x, Node child) {
			children.add(x, child);
			child.setParent(this);
		}
		private void setParent(Node parent) {
			this.parent=parent;
		}
		private Node RootSplit() {
			//create node
			
			Node newParent = new Node();
			Node newChild1 = new Node();
			Node newChild2 = new Node();
			newParent.addKey(key(1));
			newChild1.addKey(key(0));
			newChild2.addKey(key(2));
			newParent.adopt(newChild1);
			newParent.adopt(newChild2);
			return newParent;
			
		}
		private Node split() {
			Node newLeft = new Node();
			Node newRight = new Node();
			int x;
			Node nextParent;
			if(parent==null) {
				nextParent = new Node();
				nextParent.addKey(key(1));
				x = 0;
			}
			else {
				nextParent = parent();
				x = nextParent.compare(key(1));
				nextParent.addKey(key(1));
			}
			newLeft.addKey(key(0));
			newRight.addKey(key(2));
			nextParent.adopt(x,newRight);
			nextParent.adopt(x,newLeft);
			if(this.children.size()>0) {
				newLeft.adopt(child(0));
				newLeft.adopt(child(1));
				newRight.adopt(child(2));
				newRight.adopt(child(3));
			}
			if(parent!=null)
				nextParent.children.remove(x+2);
			return nextParent;
			
			
		}
		private Node balance() {
			if(parent==null) {
				return RootSplit();
			}
			else {
				Node next = new Node();
				next = this.split();
					while(next.full()) {
						if (next.parent==null) {
							Node rootnew = next.RootSplit();
							rootnew.child(0).adopt(next.child(0));
							rootnew.child(0).adopt(next.child(1));
							rootnew.child(1).adopt(next.child(2));
							rootnew.child(1).adopt(next.child(3));
							return rootnew;
						}
						else
							next=next.split();
					}
				return next;
			}
			
		}
		private Node traverse(Node walker, int x ) {
			if(walker.dupCheck(x)) {
				//walker = this;
				return walker;
			}
			if(walker.children.size()==0) {
				//walker = this;
				return walker;	
			}
			else {
				Node found = new Node();
				int next = walker.compare(x);
				walker = walker.children.get(next);
				walker = traverse(walker, x);
				return walker;
			}
		}
		
		private int compare(int x)
		{
			int i = 0;
			while(i < keys.size() && x > keys.get(i))
				i++;
			return i;
		}
		
		//checks if the next node to go to is left/middle/right
		
		
		//checks if duplicate exists in the node (x is already a key in the node)
		private boolean dupCheck(int x) {
			for (int i = 0; i < keys.size(); i++) {
				if (x==keys.get(i))
					return true;
			}
				return false;
			
		}
		
		//add key x to node
		public void addKey(int x) {
				
				if (keys.size()==2) {
					if(x<keys.get(0)) 
						keys.add(0,x);
					
					else if(x<keys.get(1)) {
						keys.add(1,x);
					}
					else {
						keys.add(2,x);
					}
						
					
				}
				else if (keys.size()==1) {
					if(x<keys.get(0)) 
						keys.add(0,x);
					else if (x>keys.get(0)){
						keys.add(x);
					}
				}
				else if (keys.size()==0) {
					keys.add(x);
				}
		}
		
	}
	
	
}
