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
		activity = new MainActivity();
		activity.startActivity(null);
		Bundle savedInstanceState = new Bundle();
		activity.onCreate(null);
		//activity.loadUrl("file://../GeoquestRobolectricTest/testres/index.html");
		
	}
	
	@Test
	public void getCordovaWidget() throws Exception {
		assertTrue(true);
	}
	
}
