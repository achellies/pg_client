package seleniumTests;

import static org.junit.Assert.assertTrue;

import java.io.File;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import com.thoughtworks.selenium.DefaultSelenium;


public class WupperSeleniumTest{
    private DefaultSelenium selenium;
	@Before
	public void setUp() throws Exception {
		selenium = new DefaultSelenium("localhost", 4444, "*chrome", "http://www.google.co.in/");
		selenium.start();
	}

	@Test
	public void testAdvancedSearch() throws Exception {
		File file = new File("assets/www/index.html");
		System.out.println(file.getAbsolutePath().replace("\\", "/"));//"file:///"+file.getAbsolutePath());
		selenium.open("file:///"+file.getAbsolutePath().replace("\\", "/"));
		assertTrue(selenium.isTextPresent("GeoQuest Web"));
		
	}

	@After
	public void tearDown() throws Exception {
		selenium.stop();
	}
	
}
