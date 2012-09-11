package com.phonegap.geoquestweb;

import org.apache.cordova.DroidGap;

import android.os.Bundle;
import android.view.Menu;

import com.strumsoft.websocket.phonegap.WebSocketFactory;

public class MainActivity extends DroidGap {

    @Override
    public void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        super.loadUrl("file:///android_asset/www/index.html");
        
        // Needed for websocket 
        appView.addJavascriptInterface(new WebSocketFactory(appView), "WebSocketFactory");
    }

    @Override
    public boolean onCreateOptionsMenu(Menu menu) {
//        getMenuInflater().inflate(R.menu.activity_main, menu);
        return true;
    }
}
