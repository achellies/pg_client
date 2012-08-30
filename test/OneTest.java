
import com.thoughtworks.selenium.*;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;


public class OneTest {
    private DefaultSelenium selenium;
	@Before
	public void setUp() throws Exception {
		selenium = new DefaultSelenium("localhost", 4444, "*firefox", "http://www.google.co.in/");
		selenium.start();
	}

	@Test
	public void testAdvancedSearch() throws Exception {
		selenium.open("http://www.google.com/");

	}

	@After
	public void tearDown() throws Exception {
		selenium.stop();
	}
	
}
