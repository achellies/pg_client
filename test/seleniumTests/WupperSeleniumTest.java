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
		assertFalse(selenium.isTextPresent("Die roten Buchstaben stehen für fehlende Zahlen in den Koordinaten, die Ihr Euch noch erarbeiten müsst. "));
		
		selenium.click("//div[@id='footer_NPCTalk']"); 
		
		assertTrue(selenium.isTextPresent("Die roten Buchstaben stehen für fehlende Zahlen in den Koordinaten, die Ihr Euch noch erarbeiten müsst. "));
		assertFalse(selenium.isTextPresent("Begebt Euch nun zu der roten Fahne auf der Karte. Dort findet Ihr das erste Rätsel. "));
		
        selenium.click("//div[@id='footer_NPCTalk']"); 
		
		assertTrue(selenium.isTextPresent("Begebt Euch nun zu der roten Fahne auf der Karte. Dort findet Ihr das erste Rätsel. "));

		selenium.click("//div[@id='footer_NPCTalk']"); 
		
		// test headers and map load
		assertTrue(selenium.isElementPresent("//div[@id='page_map']"));
		assertTrue(selenium.isElementPresent("//div[@id='header_map']"));
		assertTrue(selenium.isElementPresent("//div[@id='content_map']"));
		
		// check if initial position is correct
		String returnValue = selenium.getEval("this.browserbot.getCurrentWindow().globalMap.getMyPositionMarker().position");
		System.out.println(returnValue);
		
		// move to first checkpoint
		returnValue = selenium.getEval("this.browserbot.getCurrentWindow().globalMap.setPositionAndUpdate(51.155867, 7.141565)");
		System.out.println(returnValue);
		
		//The client should go to the next game element
		assertTrue(selenium.isTextPresent("Hier wird es rätselhaft! Bevor ihr auf den Wanderweg nach links abbiegt, schaut, welche Bezeichnung er hat und wählt sie unten aus."));
		
		//make sure 3 options are available...
		assertTrue(selenium.isElementPresent("//div[@id='answer_index_0']"));
		assertTrue(selenium.isElementPresent("//div[@id='answer_index_1']"));
		assertTrue(selenium.isElementPresent("//div[@id='answer_index_2']"));

		//with the values
		assertTrue(selenium.isTextPresent("A1"));
		assertTrue(selenium.isTextPresent("A3"));
		assertTrue(selenium.isTextPresent("A9"));
	
	}

	@After
	public void tearDown() throws Exception {
		selenium.stop();
	}

}
