package pmf.mina.bjelica.travelholic.model.dto;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

public class PostDto {
	private String title;
	private String description;
	private String  start;
	private String end;
	private String city;
	private String zipcode;
	private String country;
	private String username;
	private int amount;
	
	public PostDto() {
		// TODO Auto-generated constructor stub
	}

	public String getTitle() {
		return title;
	}

	public String getDescription() {
		return description;
	}

	public Date getStart() {
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		Date startDate;
		try {
			startDate = sdf.parse(this.start);
			return startDate;
		} catch (ParseException e) {
			e.printStackTrace();
		}
		return null;
	}

	public Date getEnd() {
		SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
		Date endDate;
		try {
			endDate = sdf.parse(this.end);
			return endDate;
		} catch (ParseException e) {
			e.printStackTrace();
		}
		return null;
	}

	public String getCity() {
		return city;
	}

	public String getZipcode() {
		return zipcode;
	}

	public String getCountry() {
		return country;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public void setStart(String start) {
		this.start = start;
	}

	public void setEnd(String end) {
		this.end = end;
	}

	public void setCity(String city) {
		this.city = city;
	}

	public void setZipcode(String zipcode) {
		this.zipcode = zipcode;
	}

	public void setCountry(String country) {
		this.country = country;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public int getAmount() {
		return amount;
	}

	public void setAmount(int amount) {
		this.amount = amount;
	}
	
	

}
