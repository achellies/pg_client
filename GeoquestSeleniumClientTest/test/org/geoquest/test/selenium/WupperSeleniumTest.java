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
		
		assertTrue(selenium.isElementPresent("//div[@id='image_StartAndExitScreen']/img[@id='StartAndExitScreenMission' and contains(@src, 'start_screen.jpg')]"));
		
		selenium.click("//div[@id='image_StartAndExitScreen']/img[@id='StartAndExitScreenMission']");

		assertTrue(selenium.isElementPresent("//img[contains(@src, 'Schatzkarte-0.png')]"));
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
		returnValue = returnValue.trim().substring(1, returnValue.length()-1);
		String[] buff = returnValue.split(",");
        assertEquals(Double.parseDouble("50.751843"), Double.parseDouble(buff[0]), 0.000000001); 
        assertEquals(Double.parseDouble("7.096065"), Double.parseDouble(buff[1]), 0.000000001);
		
		// move to first checkpoint
	    selenium.getEval("this.browserbot.getCurrentWindow().globalMap.setPositionAndUpdate(51.155867, 7.141565)");	

	    
	    /** Mission 1 **/
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
		
		// test correct answer
		selenium.click("//*[contains(child::text(),'A9')]");
		assertTrue(selenium.isTextPresent("Das ist richtig!"));
		selenium.click("//div[@id='footer_QuestionAndAnswer']"); 
		assertTrue(selenium.isTextPresent("Genügend Fragen richtig beantwortet!\nMission erfolgreich abgeschlossen!"));
		
		
		// new interaction 
		selenium.click("//div[@id='footer_QuestionAndAnswer']");
		assertTrue(selenium.isElementPresent("//img[contains(@src, 'Schatzkarte-1.png')]")); 
		assertTrue(selenium.isTextPresent("Super! Ihr habt die Zahl für den roten Buchstaben A erraten und seid dem Schatz nun ein Stückchen näher. Sucht nun die nächste Fahne auf der Karte und begebt Euch dort hin. "));
		selenium.click("//div[@id='footer_NPCTalk']"); 
		
		
		
		
		/** Mission 2 **/
		// now present at the map again and head for the new station/mission
		selenium.getEval("this.browserbot.getCurrentWindow().globalMap.setPositionAndUpdate(51.159399, 7.1344329999999445)");	
	
		//The client should go to the next game element
	    assertTrue(selenium.isTextPresent("Schaut Euch die Infotafel an. An welchem Datum wurde der letzte Niet in die Brücke geschlagen? Die Quersumme der ersten beiden Ziffern des Datums _ _. 03. 1897 liefert den nächsten Hinweis."));

		//make sure 3 options are available...
		assertTrue(selenium.isElementPresent("//div[@id='answer_index_0']"));
		assertTrue(selenium.isElementPresent("//div[@id='answer_index_1']"));
		assertTrue(selenium.isElementPresent("//div[@id='answer_index_2']"));
		
		//TODO: tight check needed. is answer present, rather than is text present (might be only the question)
		//with the values
		assertTrue(selenium.isTextPresent("4"));
		assertTrue(selenium.isTextPresent("6"));
		assertTrue(selenium.isTextPresent("8"));
		
		// test wrong answers
		selenium.click("//*[contains(child::text(),'6')]");
		assertTrue(selenium.isTextPresent("Das stimmt leider nicht. Ihr habt wohl das falsche Datum erwischt. Eure Zahl ist zu hoch."));
		selenium.click("//div[@id='footer_QuestionAndAnswer']"); 
		assertTrue(selenium.isTextPresent("Mission gescheitert!"));
		selenium.click("//div[@id='footer_QuestionAndAnswer']"); 
		
		// test wrong answers
		selenium.click("//*[contains(child::text(),'\t8\n')]");
		assertTrue(selenium.isTextPresent("Das stimmt leider nicht. Guckt euch die Tafel genauer an! Eure Zahl ist viel zu hoch."));
		selenium.click("//div[@id='footer_QuestionAndAnswer']"); 
		assertTrue(selenium.isTextPresent("Mission gescheitert!"));
		selenium.click("//div[@id='footer_QuestionAndAnswer']"); 
		
		// test correct answer
		selenium.click("//*[contains(child::text(),'4')]");
		assertTrue(selenium.isTextPresent("Das ist richtig!"));
		selenium.click("//div[@id='footer_QuestionAndAnswer']"); 
		assertTrue(selenium.isTextPresent("Genügend Fragen richtig beantwortet!\nMission erfolgreich abgeschlossen!"));
		selenium.click("//div[@id='footer_QuestionAndAnswer']"); 

		assertTrue(selenium.isElementPresent("//img[contains(@src, 'Schatzkarte-2.png')]"));
		selenium.click("//div[@id='footer_NPCTalk']"); 
		
		
		/** Mission 3 **/
		// now present at the map again and head for the new station/mission
		selenium.getEval("this.browserbot.getCurrentWindow().globalMap.setPositionAndUpdate(51.156907, 7.136112)");	
	
		//The client should go to the next game element
	    assertTrue(selenium.isTextPresent("Schaut Euch die Infotafel an. Wieviele gelbe Wörter, incl. Überschrift, gibt es auf der linken Seite der Tafel?"));

		//make sure 3 options are available...
		assertTrue(selenium.isElementPresent("//div[@id='answer_index_0']"));
		assertTrue(selenium.isElementPresent("//div[@id='answer_index_1']"));
		assertTrue(selenium.isElementPresent("//div[@id='answer_index_2']"));
		
		//with the values
		assertTrue(selenium.isTextPresent("7"));
		assertTrue(selenium.isTextPresent("5"));
		assertTrue(selenium.isTextPresent("9"));
		
		// test wrong answers
		selenium.click("//*[contains(child::text(),'5')]");
		assertTrue(selenium.isTextPresent("Das stimmt leider nicht. Wenn Ihr richtig zählt, werdet Ihr feststellen, dass es mehr Wörter sind."));
		selenium.click("//div[@id='footer_QuestionAndAnswer']"); 
		assertTrue(selenium.isTextPresent("Mission gescheitert!"));
		selenium.click("//div[@id='footer_QuestionAndAnswer']"); 
		
		// test wrong answers
		selenium.click("//*[contains(child::text(),'\t9\n')]");
		
		assertTrue(selenium.isTextPresent("Das stimmt leider nicht. Zählt noch einmal nach! Es sind weniger Wörter."));
		selenium.click("//div[@id='footer_QuestionAndAnswer']"); 
		assertTrue(selenium.isTextPresent("Mission gescheitert!"));
		selenium.click("//div[@id='footer_QuestionAndAnswer']"); 
		
		// test correct answer
		selenium.click("//*[contains(child::text(),'7')]");
		assertTrue(selenium.isTextPresent("Das ist richtig!"));
		selenium.click("//div[@id='footer_QuestionAndAnswer']"); 
		assertTrue(selenium.isTextPresent("Genügend Fragen richtig beantwortet!\nMission erfolgreich abgeschlossen!"));
		selenium.click("//div[@id='footer_QuestionAndAnswer']"); 

		assertTrue(selenium.isElementPresent("//img[contains(@src, 'Schatzkarte-3.png')]"));
		selenium.click("//div[@id='footer_NPCTalk']"); 		
		
		
		/** Mission 4 **/
		// now present at the map again and head for the new station/mission
		selenium.getEval("this.browserbot.getCurrentWindow().globalMap.setPositionAndUpdate(51.155736, 7.136207)");	
	
		//The client should go to the next game element
	    assertTrue(selenium.isTextPresent("Wieviele \"Backen\" könnt Ihr entdecken?"));

		//make sure 3 options are available...
		assertTrue(selenium.isElementPresent("//div[@id='answer_index_0']"));
		assertTrue(selenium.isElementPresent("//div[@id='answer_index_1']"));
		assertTrue(selenium.isElementPresent("//div[@id='answer_index_2']"));
		
		//with the values
		assertTrue(selenium.isTextPresent("0"));
		assertTrue(selenium.isTextPresent("5"));
		assertTrue(selenium.isTextPresent("2"));
		
		// test wrong answers
		selenium.click("//*[contains(child::text(),'\t0\n')]");
		assertTrue(selenium.isTextPresent("Das stimmt leider nicht. Ihr habt die Backen wohl übersehen. Sucht noch einmal in der Nähe vom Wasserfall."));
		selenium.click("//div[@id='footer_QuestionAndAnswer']"); 
		assertTrue(selenium.isTextPresent("Mission gescheitert!"));
		selenium.click("//div[@id='footer_QuestionAndAnswer']"); 
		
		// test wrong answers
		selenium.click("//*[contains(child::text(),'\t5\n')]");
		
		assertTrue(selenium.isTextPresent("Das stimmt leider nicht. Es sind weniger Backen. Sucht noch einmal in der Nähe vom Wasserfall."));
		selenium.click("//div[@id='footer_QuestionAndAnswer']"); 
		assertTrue(selenium.isTextPresent("Mission gescheitert!"));
		selenium.click("//div[@id='footer_QuestionAndAnswer']"); 
		
		// test correct answer
		selenium.click("//*[contains(child::text(),'\t2\n')]");
		assertTrue(selenium.isTextPresent("Das ist richtig!"));
		selenium.click("//div[@id='footer_QuestionAndAnswer']"); 
		assertTrue(selenium.isTextPresent("Genügend Fragen richtig beantwortet!\nMission erfolgreich abgeschlossen!"));
		selenium.click("//div[@id='footer_QuestionAndAnswer']"); 

		assertTrue(selenium.isElementPresent("//img[contains(@src, 'Schatzkarte-4.png')]"));
		selenium.click("//div[@id='footer_NPCTalk']"); 		
		
		/** Mission 5 **/
		// now present at the map again and head for the new station/mission
		selenium.getEval("this.browserbot.getCurrentWindow().globalMap.setPositionAndUpdate(51.153869, 7.135617)");	
	
		//The client should go to the next game element
	    assertTrue(selenium.isTextPresent("Findet heraus was über die Wupper gegangen ist und zählt nach, aus wievielen Buchstaben es besteht. Welche Antwortmöglichkeit entspricht der Buchstabenanzahl + 1?"));

		//make sure 3 options are available...
		assertTrue(selenium.isElementPresent("//div[@id='answer_index_0']"));
		assertTrue(selenium.isElementPresent("//div[@id='answer_index_1']"));
		assertTrue(selenium.isElementPresent("//div[@id='answer_index_2']"));
		
		//with the values
		assertTrue(selenium.isTextPresent("5"));
		assertTrue(selenium.isTextPresent("7"));
		assertTrue(selenium.isTextPresent("9"));
		
		// test wrong answers
		selenium.click("//*[contains(child::text(),'\t9\n')]");
		assertTrue(selenium.isTextPresent("Das stimmt leider nicht. Das gesuchte Wort ist in Stein gemeißelt und hat deutlich weniger Buchstaben!"));
		selenium.click("//div[@id='footer_QuestionAndAnswer']"); 
		assertTrue(selenium.isTextPresent("Mission gescheitert!"));
		selenium.click("//div[@id='footer_QuestionAndAnswer']"); 
		
		// test wrong answers
		selenium.click("//*[contains(child::text(),'\t7\n')]");
		
		assertTrue(selenium.isTextPresent("Das stimmt leider nicht. Das gesuchte Wort ist in Stein gemeißelt und hat weniger Buchstaben!"));
		selenium.click("//div[@id='footer_QuestionAndAnswer']"); 
		assertTrue(selenium.isTextPresent("Mission gescheitert!"));
		selenium.click("//div[@id='footer_QuestionAndAnswer']"); 
		
		// test correct answer
		selenium.click("//*[contains(child::text(),'\t5\n')]");
		assertTrue(selenium.isTextPresent("Das ist richtig!"));
		selenium.click("//div[@id='footer_QuestionAndAnswer']"); 
		assertTrue(selenium.isTextPresent("Genügend Fragen richtig beantwortet!\nMission erfolgreich abgeschlossen!"));
		selenium.click("//div[@id='footer_QuestionAndAnswer']"); 
		
		assertTrue(selenium.isTextPresent("Super! Noch ein roter Buchstabe und Ihr habt die Koordinaten für den Schatz! Begebt Euch nun zur letzten Fahne. "));

		assertTrue(selenium.isElementPresent("//img[contains(@src, 'Schatzkarte-5.png')]"));
		selenium.click("//div[@id='footer_NPCTalk']"); 		
		
		
		/** Mission 6 **/
		// now present at the map again and head for the new station/mission
		selenium.getEval("this.browserbot.getCurrentWindow().globalMap.setPositionAndUpdate(51.152587, 7.135797)");	
	
		//The client should go to the next game element
	    assertTrue(selenium.isTextPresent("Zählt die Anzahl der Kuhlen. Welchen Wert erhält man, wenn man die Anzahl durch sieben teilt?"));

		//make sure 3 options are available...
		assertTrue(selenium.isElementPresent("//div[@id='answer_index_0']"));
		assertTrue(selenium.isElementPresent("//div[@id='answer_index_1']"));
		assertTrue(selenium.isElementPresent("//div[@id='answer_index_2']"));
		
		//with the values
		assertTrue(selenium.isTextPresent("1"));
		assertTrue(selenium.isTextPresent("2"));
		assertTrue(selenium.isTextPresent("3"));
		
		// test wrong answers
		selenium.click("//*[contains(child::text(),'\t3\n')]");
		assertTrue(selenium.isTextPresent("Das stimmt leider nicht. So viele Kuhlen hat der Stein nicht."));
		selenium.click("//div[@id='footer_QuestionAndAnswer']"); 
		assertTrue(selenium.isTextPresent("Mission gescheitert!"));
		selenium.click("//div[@id='footer_QuestionAndAnswer']"); 
		
		// test wrong answers
		selenium.click("//*[contains(child::text(),'\t1\n')]");
		
		assertTrue(selenium.isTextPresent("Das stimmt leider nicht. Der Stein hat mehr als 7 Kuhlen."));
		selenium.click("//div[@id='footer_QuestionAndAnswer']"); 
		assertTrue(selenium.isTextPresent("Mission gescheitert!"));
		selenium.click("//div[@id='footer_QuestionAndAnswer']"); 
		
		// test correct answer
		selenium.click("//*[contains(child::text(),'\t2\n')]");
		assertTrue(selenium.isTextPresent("Das ist richtig!"));
		selenium.click("//div[@id='footer_QuestionAndAnswer']"); 
		assertTrue(selenium.isTextPresent("Genügend Fragen richtig beantwortet!\nMission erfolgreich abgeschlossen!"));
		selenium.click("//div[@id='footer_QuestionAndAnswer']"); 
		
		assertTrue(selenium.isTextPresent("Ihr habt den Ort, an dem der Schatz versteckt ist gefunden. Er wird durch ein Fadenkreuz auf der Karte markiert. "));
		
		selenium.click("//div[@id='footer_NPCTalk']"); 		
	
		assertTrue(selenium.isTextPresent("Ihr habt den Ort, an dem der Schatz versteckt ist gefunden. Er wird durch ein Fadenkreuz auf der Karte markiert."));
		assertTrue(selenium.isTextPresent("Begebt euch nun zu dem Fadenkreuz. "));

		selenium.click("//div[@id='footer_NPCTalk']"); 		
		
		
		/** Final Mission **/
		// now present at the map again and head for the new station/mission
		selenium.getEval("this.browserbot.getCurrentWindow().globalMap.setPositionAndUpdate(51.153751, 7.14045)");	
	
		//The client should go to the next game element
	    assertTrue(selenium.isTextPresent("Sucht nun den Schatz, der hier ganz in der Nähe versteckt ist. Wenn ihr Ihn gefunden habt drückt \"Gefunden\". Falls Ihr Hilfe braucht, drückt \"Hilfe\"."));

		//make sure 2 options are available...
		assertTrue(selenium.isElementPresent("//div[@id='answer_index_0']"));
		assertTrue(selenium.isElementPresent("//div[@id='answer_index_1']"));
		
		//with the values
		assertTrue(selenium.isTextPresent("Gefunden!"));
		assertTrue(selenium.isTextPresent("Hilfe!"));
		
		
		// test Help
		selenium.click("//*[contains(child::text(),'\tHilfe!\n')]");
		assertTrue(selenium.isTextPresent("Geht zum Erste-Hilfe Zeichen auf der Karte. Dort erhaltet Ihr einen Tip über das Versteck des Schatzes."));
		selenium.click("//div[@id='footer_QuestionAndAnswer']"); 
		
		// now present at the map again and head for the new station/mission
		selenium.getEval("this.browserbot.getCurrentWindow().globalMap.setPositionAndUpdate(51.154128, 7.140568)");	
		
		assertTrue(selenium.isTextPresent("Seid Ihr Euch wirklich sicher, dass Ihr einen Hinweis auf das Versteck des Schatzes wollt?"));
		
		//make sure 2 options are available...
		assertTrue(selenium.isElementPresent("//div[@id='answer_index_0']"));
		assertTrue(selenium.isElementPresent("//div[@id='answer_index_1']"));
		
		//with the values
		assertTrue(selenium.isTextPresent("Ja!"));
		assertTrue(selenium.isTextPresent("Nein!"));
		
		//test deny help
		selenium.click("//*[contains(child::text(),'\tNein!\n')]");
		
		assertTrue(selenium.isTextPresent("Na gut, dann probiert es noch einmal selbst. Geht wieder zum Kreuz auf der Karte zurück."));
		
		selenium.click("//div[@id='footer_QuestionAndAnswer']"); 
		
		// now present at the map again and head for the new station/mission
		selenium.getEval("this.browserbot.getCurrentWindow().globalMap.setPositionAndUpdate(51.154128, 7.140568)");	
	
		//make sure 2 options are available...
		assertTrue(selenium.isElementPresent("//div[@id='answer_index_0']"));
		assertTrue(selenium.isElementPresent("//div[@id='answer_index_1']"));
		
		//with the values
		assertTrue(selenium.isTextPresent("Ja!"));
		assertTrue(selenium.isTextPresent("Nein!"));
		
		//test deny help
		selenium.click("//*[contains(child::text(),'\tJa!\n')]");
		
		assertTrue(selenium.isTextPresent("Der Hinweis lautet - Buchen sollst du suchen! Geht jetzt wieder zum Kreuz auf der Karte zurück."));
		
		selenium.click("//div[@id='footer_QuestionAndAnswer']"); 
		assertTrue(selenium.isTextPresent("Genügend Fragen richtig beantwortet!\nMission erfolgreich abgeschlossen!"));
		selenium.click("//div[@id='footer_QuestionAndAnswer']"); 
		
		// now present at the map again and head for the new station/mission
		selenium.getEval("this.browserbot.getCurrentWindow().globalMap.setPositionAndUpdate(51.153751, 7.14045)");	
	
		//The client should go to the next game element
	    assertTrue(selenium.isTextPresent("Sucht nun den Schatz, der hier ganz in der Nähe versteckt ist. Wenn ihr Ihn gefunden habt drückt \"Gefunden\". Falls Ihr Hilfe braucht, drückt \"Hilfe\"."));

		//make sure 2 options are available...
		assertTrue(selenium.isElementPresent("//div[@id='answer_index_0']"));
		assertTrue(selenium.isElementPresent("//div[@id='answer_index_1']"));
		
		//with the values
		assertTrue(selenium.isTextPresent("Gefunden!"));
		assertTrue(selenium.isTextPresent("Hilfe!"));
		
		
		// test Help
		selenium.click("//*[contains(child::text(),'\tGefunden!\n')]");
		
		assertTrue(selenium.isTextPresent("Herzlichen Glückwunsch zu Eurem Fund!"));
		
		selenium.click("//div[@id='footer_QuestionAndAnswer']"); 
		
		assertTrue(selenium.isTextPresent("Genügend Fragen richtig beantwortet!\nMission erfolgreich abgeschlossen!"));
		selenium.click("//div[@id='footer_QuestionAndAnswer']"); 
		
		assertTrue(selenium.isTextPresent("Wir hoffen unsere GeoCaching Demonstration hat euch gefallen und Spaß gemacht! :) "));

		selenium.click("//div[@id='footer_NPCTalk']");
		
		assertTrue(selenium.isTextPresent("Wir hoffen unsere GeoCaching Demonstration hat euch gefallen und Spaß gemacht! :) "));
		assertTrue(selenium.isTextPresent("Bitte begebt Euch jetzt zurück zur Akademie und gebt das Handy wieder an unserem Stand ab. "));

		selenium.click("//div[@id='footer_NPCTalk']");

		//check whether index page is opened
		assertTrue(selenium.isTextPresent("GeoQuest Web"));
	}

	@After
	public void tearDown() throws Exception {
		selenium.stop();
	}

}
