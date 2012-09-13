package org.geoquest.test;

import static org.hamcrest.CoreMatchers.equalTo;
import static org.junit.Assert.assertThat;

import java.io.IOException;
import java.io.InputStream;

import junit.framework.TestCase;

import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mockito;
import org.xmlpull.v1.XmlPullParser;
import org.xmlpull.v1.XmlPullParserException;
import org.xmlpull.v1.XmlPullParserFactory;

import android.content.Intent;
import android.os.Bundle;

import com.phonegap.geoquestweb.MainActivity;
import com.phonegap.geoquestweb.R;
import com.xtremelabs.robolectric.RobolectricTestRunner;
import static org.mockito.Mockito.*;

@RunWith(RobolectricTestRunner.class)
public class CordovaFileAccessTest extends TestCase {
MainActivity activity;
	
	@Before
	public void setUp() throws Exception {} {
		//activity = (MainActivity) new MainActivity().getActivity();
		//activity.setIntent(new Intent()); // required by activity.onCreate();
		//activity.onCreate(null); // won't work, until Robolectric is extended (see https://groups.google.com/forum/?fromgroups=#!topic/robolectric/Mg74WEYt7Rk)
		//activity.loadUrl("file://../GeoquestRobolectricTest/testres/index.html");
		
	}
	
	@Test
	public void getCordovaWidget() throws Exception {
		// Cannot be tested yet with Robolectric
		assertTrue(true);
	}
	
}
