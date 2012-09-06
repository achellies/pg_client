package org.geoquest.test.selenium;

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

	public static String APP_INDEX_HTML = "../GeoQuestPhoneGapClient/assets/www/index.html";
	
	@Before
	public void setUp() throws Exception {
		selenium = new DefaultSelenium("localhost", 4444, "*chrome",
				"http://www.google.co.in/");
		selenium.start();
		File file = new File(APP_INDEX_HTML);
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
		
		// check if initial position is correct
		String returnValue = selenium.getEval("this.browserbot.getCurrentWindow().globalMap.getMyPositionMarker().position");
		returnValue = returnValue.trim().substring(1, returnValue.length()-1);
		String[] buff = returnValue.split(",");
        assertEquals(Double.parseDouble("50.751843"), Double.parseDouble(buff[0]), 0.000000001); 
        assertEquals(Double.parseDouble("7.096065"), Double.parseDouble(buff[1]), 0.000000001);
		
		// move to first checkpoint
	    selenium.getEval("this.browserbot.getCurrentWindow().globalMap.setPositionAndUpdate(51.155867, 7.141565)");	

		//The client should go to the next game element
		assertTrue(selenium.isTextPresent("Hier wird es r�tselhaft! Bevor ihr auf den Wanderweg nach links abbiegt, schaut, welche Bezeichnung er hat und w�hlt sie unten aus."));

		//make sure 3 options are available...
		assertTrue(selenium.isElementPresent("//div[@id='answer_index_0']"));
		assertTrue(selenium.isElementPresent("//div[@id='answer_index_1']"));
		assertTrue(selenium.isElementPresent("//div[@id='answer_index_2']"));

		//with the values
		assertTrue(selenium.isTextPresent("A1"));
		assertTrue(selenium.isTextPresent("A3"));
		assertTrue(selenium.isTextPresent("A9"));
		
		
		// test wrong answers
		selenium.click("//*[contains(child::text(),'A1')]");
		assertTrue(selenium.isTextPresent("Das stimmt leider nicht. Guckt noch einmal genauer hin!"));
		selenium.click("//div[@id='footer_QuestionAndAnswer']"); 
		assertTrue(selenium.isTextPresent("Mission gescheitert!"));
		selenium.click("//div[@id='footer_QuestionAndAnswer']"); 
		
		// test wrong answers
		selenium.click("//*[contains(child::text(),'A3')]");
		assertTrue(selenium.isTextPresent("Das stimmt leider nicht. Schaut noch einmal nach!"));
		selenium.click("//div[@id='footer_QuestionAndAnswer']"); 
		assertTrue(selenium.isTextPresent("Mission gescheitert!"));
		selenium.click("//div[@id='footer_QuestionAndAnswer']"); 
		
		// test wrong answers
		selenium.click("//*[contains(child::text(),'A9')]");
		assertTrue(selenium.isTextPresent("Das ist richtig!"));
		selenium.click("//div[@id='footer_QuestionAndAnswer']"); 
		assertTrue(selenium.isTextPresent("Gen�gend Fragen richtig beantwortet!\nMission erfolgreich abgeschlossen!"));
		
		
		// new interaction 
		selenium.click("//div[@id='footer_QuestionAndAnswer']"); 
		assertTrue(selenium.isTextPresent("Super! Ihr habt die Zahl f�r den roten Buchstaben A erraten und seid dem Schatz nun ein St�ckchen n�her. Sucht nun die n�chste Fahne auf der Karte und begebt Euch dort hin. "));
		selenium.click("//div[@id='footer_NPCTalk']"); 
		
		
		// now present at the map again and head for new function
		selenium.getEval("this.browserbot.getCurrentWindow().globalMap.setPositionAndUpdate(51.159399, 7.1344329999999445)");	
	
		//The client should go to the next game element
	    assertTrue(selenium.isTextPresent("Schaut Euch die Infotafel an. An welchem Datum wurde der letzte Niet in die Br�cke geschlagen? Die Quersumme der ersten beiden Ziffern des Datums _ _. 03. 1897 liefert den n�chsten Hinweis."));

		//make sure 3 options are available...
		assertTrue(selenium.isElementPresent("//div[@id='answer_index_0']"));
		assertTrue(selenium.isElementPresent("//div[@id='answer_index_1']"));
		assertTrue(selenium.isElementPresent("//div[@id='answer_index_2']"));
		
		//with the values
		assertTrue(selenium.isTextPresent("8"));
		assertTrue(selenium.isTextPresent("6"));
		assertTrue(selenium.isTextPresent("9"));
	}

	@After
	public void tearDown() throws Exception {
		selenium.stop();
	}

}
