package pmf.mina.bjelica.travelholic.model.entity;

import java.io.Serializable;
import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/**
 * The persistent class for the user database table.
 * 
 */
@Entity
@NamedQuery(name = "User.findAll", query = "SELECT u FROM User u")
public class User implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;

	private String address;

	@Temporal(TemporalType.DATE)
	private Date birthDate;

	private String caption;

	private String firstName;

	private String lastName;

	private String password;

	private String username;

	private String email;

	private String imageName;

	// bi-directional many-to-one association to Comment
	@JsonBackReference
	@OneToMany(mappedBy = "user")
	private List<Comment> comments;

	// bi-directional many-to-many association to Post
	@JsonIgnore
	@ManyToMany
	@JoinTable(name = "favorite", joinColumns = { @JoinColumn(name = "user_id") }, inverseJoinColumns = {
			@JoinColumn(name = "post_id") })
	private List<Post> posts1;

	// bi-directional many-to-one association to Post
	@OneToMany(mappedBy = "user") // postovi koje je postavio
	@JsonIgnore
	private List<Post> posts2;

	// bi-directional many-to-one association to Message
	@OneToMany(mappedBy = "user")
	private List<Message> messages;

	// bi-directional many-to-many association to Chat
	@ManyToMany
	@JoinTable(name = "user_has_chat", joinColumns = { @JoinColumn(name = "user_id") }, inverseJoinColumns = {
			@JoinColumn(name = "Chat_id") })
	private List<Chat> chats;

	public User() {
	}

	public int getId() {
		return this.id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getAddress() {
		return this.address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	public Date getBirthDate() {
		return this.birthDate;
	}

	public void setBirthDate(Date birthDate) {
		this.birthDate = birthDate;
	}

	public String getCaption() {
		return this.caption;
	}

	public void setCaption(String caption) {
		this.caption = caption;
	}

	public String getFirstName() {
		return this.firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return this.lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public String getPassword() {
		return this.password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getUsername() {
		return this.username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public List<Comment> getComments() {
		return this.comments;
	}

	public void setComments(List<Comment> comments) {
		this.comments = comments;
	}

	public Comment addComment(Comment comment) {
		getComments().add(comment);
		comment.setUser(this);

		return comment;
	}

	public Comment removeComment(Comment comment) {
		getComments().remove(comment);
		comment.setUser(null);

		return comment;
	}

	public List<Post> getPosts1() {
		if (posts1 == null)
			posts1 = new ArrayList<>();
		return this.posts1;
	}

	public void setPosts1(List<Post> posts1) {
		this.posts1 = posts1;
	}

	public List<Post> getPosts2() {
		if (posts2 == null)
			posts2 = new ArrayList<>();
		return this.posts2;
	}

	public void setPosts2(List<Post> posts2) {
		this.posts2 = posts2;
	}

	public Post addPosts2(Post posts2) {
		getPosts2().add(posts2);
		posts2.setUser(this);

		return posts2;
	}

	public Post removePosts2(Post posts2) {
		getPosts2().remove(posts2);
		posts2.setUser(null);

		return posts2;
	}

	public String getImageName() {
		return imageName;
	}

	public void setImageName(String imageName) {
		this.imageName = imageName;
	}
	
	public List<Message> getMessages() {
		return this.messages;
	}
	
	public void setMessages(List<Message> messages) {
		this.messages = messages;
	}

	public Message addMessage(Message message) {
		getMessages().add(message);
		message.setUser(this);

		return message;
	}

	public Message removeMessage(Message message) {
		getMessages().remove(message);
		message.setUser(null);

		return message;
	}
	
	public List<Chat> getChats() {
		return this.chats;
	}

	public void setChats(List<Chat> chats) {
		this.chats = chats;
	}
}