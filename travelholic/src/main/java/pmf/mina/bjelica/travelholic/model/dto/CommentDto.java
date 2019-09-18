package pmf.mina.bjelica.travelholic.model.dto;

public class CommentDto {
	
	private String text;
	private String username;
	private int postId;
	
	public CommentDto() {
		// TODO Auto-generated constructor stub
	}

	public String getText() {
		return text;
	}

	public void setText(String text) {
		this.text = text;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public int getPostId() {
		return postId;
	}

	public void setPostId(int postId) {
		this.postId = postId;
	}
	
	

}
