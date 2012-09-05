package seleniumTests;

import static org.junit.Assert.*;
import static org.junit.Assert.assertTrue;

import java.io.File;

import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import com.thoughtworks.selenium.DefaultSelenium;

public class WupperSeleniumTest {
	private DefaultSelenium selenium;
	private String pathToIndex;

	@Before
	public void setUp() throws Exception {
		selenium = new DefaultSelenium("localhost", 4444, "*chrome",
				"http://www.google.co.in/");
		selenium.start();
		File file = new File("assets/www/index.html");
		pathToIndex = "file:///" + file.getAbsolutePath().replace("\\", "/");
	}

	@Test
	public void testWupperGameWithoutLocalStorage() throws Exception {
		// start pg_client in browser
		selenium.open(pathToIndex);

		//check whether index page is opened
		assertTrue(selenium.isTextPresent("GeoQuest Web"));
		
		//start geoQuestSpielmarkt
		selenium.click("//a[@id='startGeoQuestSpielmarkt']/span");
		
		//dont use locally stored game state
		selenium.chooseCancelOnNextConfirmation();
		
		assertTrue(selenium.isElementPresent("//div[@id='image_StartAndExitScreen']/img[@id='StartAndExitScreenMission']"));
		
		selenium.click("//div[@id='image_StartAndExitScreen']/img[@id='StartAndExitScreenMission']");
		
		assertTrue("One welcome line present", selenium.isTextPresent("Ein herzliches Willkommen beim Spielmarkt 2012 in Remscheid!"));
		assertFalse(selenium.isTextPresent("Es freut uns, dass Ihr an unserer GeoCaching Demo teilnehmen wollt."));
		
		selenium.click("//div[@id='footer_NPCTalk']");
	
		assertTrue(selenium.isTextPresent("Ein herzliches Willkommen beim Spielmarkt 2012 in Remscheid!"));
		assertTrue(selenium.isTextPresent("Es freut uns, dass Ihr an unserer GeoCaching Demo teilnehmen wollt."));
		assertFalse(selenium.isTextPresent("Das Ziel beim GeoCaching ist es die Koordinaten eines Schatzes zu bestimmen und diesen zu finden."));		
		
		selenium.click("//div[@id='footer_NPCTalk']"); 
		
		assertTrue(selenium.isTextPresent("Das Ziel beim GeoCaching ist es die Koordinaten eines Schatzes zu bestimmen und diesen zu finden."));	
		assertFalse(selenium.isTextPresent("Das obere Bild zeigt die Koordinaten des gesuchten Schatzes. "));	
		
		selenium.click("//div[@id='footer_NPCTalk']"); 
		
		assertTrue(selenium.isTextPresent("Das obere Bild zeigt die Koordinaten des gesuchten Schatzes. "));
		assertFalse(selenium.isTextPresent("Die roten Buchstaben stehen f�r fehlende Zahlen in den Koordinaten, die Ihr Euch noch erarbeiten m�sst. "));
		
		selenium.click("//div[@id='footer_NPCTalk']"); 
		
		assertTrue(selenium.isTextPresent("Die roten Buchstaben stehen f�r fehlende Zahlen in den Koordinaten, die Ihr Euch noch erarbeiten m�sst. "));
		assertFalse(selenium.isTextPresent("Begebt Euch nun zu der roten Fahne auf der Karte. Dort findet Ihr das erste R�tsel. "));
		
        selenium.click("//div[@id='footer_NPCTalk']"); 
		
		assertTrue(selenium.isTextPresent("Begebt Euch nun zu der roten Fahne auf der Karte. Dort findet Ihr das erste R�tsel. "));

		selenium.click("//div[@id='footer_NPCTalk']"); 
		
		// test headers and map load
		assertTrue(selenium.isElementPresent("//div[@id='page_map']"));
		assertTrue(selenium.isElementPresent("//div[@id='header_map']"));
		assertTrue(selenium.isElementPresent("//div[@id='content_map']"));
		
		
	}

	@After
	public void tearDown() throws Exception {
		selenium.stop();
	}

}
