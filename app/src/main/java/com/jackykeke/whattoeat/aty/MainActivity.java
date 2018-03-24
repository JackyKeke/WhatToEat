package com.jackykeke.whattoeat.aty;

import android.annotation.SuppressLint;
import android.content.Context;
import android.os.Bundle;
import android.support.v7.app.AppCompatActivity;
import android.text.TextUtils;
import android.view.inputmethod.InputMethodManager;
import android.webkit.JavascriptInterface;

import com.jackykeke.whattoeat.R;
import com.jackykeke.whattoeat.app.AppSharePreferences;
import com.jackykeke.whattoeat.view.RichEditor2;

public class MainActivity extends AppCompatActivity {


    private RichEditor2 webView;

    private boolean isReady = false;
    //    private TextView test;
    private Context context;
    private StringBuilder eatThings;

    @SuppressLint({"SetJavaScriptEnabled", "AddJavascriptInterface"})
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        context = MainActivity.this;

        initView();
        initData();
    }

    private void initView() {
        webView = (RichEditor2) findViewById(R.id.webView);
    }

    private void initData() {

        webView.addJavascriptInterface(new JSBirdge(this), "hello");
        webView.loadURL("");
        String s1 = AppSharePreferences.getEatThings(context);
        webView.showInfoFromJava(s1);

    }


    private class JSBirdge {
        private Context mContext;

        public JSBirdge(Context context) {
            this.mContext = context;
        }


        @JavascriptInterface
        public void showKeyboard() {
            InputMethodManager imm = (InputMethodManager) getSystemService(Context.INPUT_METHOD_SERVICE);
            imm.toggleSoftInput(0, InputMethodManager.HIDE_NOT_ALWAYS);
        }

        //在js中调用window.hello.sendAddData(name)，便会触发此方法。
        @JavascriptInterface
        public void sendAddData(String thing) {
            addEatThing(thing);
        }

        //在js中调用window.hello.sendDeleData(name)，便会触发此方法。
        @JavascriptInterface
        public void sendDeleData(String thing) {
            cancelEatThing(thing);
        }

    }

    private void addEatThing(String s) {

        eatThings = new StringBuilder(AppSharePreferences.getEatThings(context));
        if (TextUtils.isEmpty(eatThings)) {
            eatThings.append(s);
        } else {
            eatThings.append(",");
            eatThings.append(s);
        }
        AppSharePreferences.setEatThings(context, eatThings.toString());

    }

    private String cancelEatThing(String s) {
        String allString = AppSharePreferences.getEatThings(context);
        int position = allString.indexOf(s);
        int length = s.length();
        int Length = allString.length();
        String newString;
        switch (position) {
            case -1:
                AppSharePreferences.setEatThings(context, allString);
                return allString;
            case 0:
                newString = allString.substring(0, position) + allString.substring(position + length, Length);
                AppSharePreferences.setEatThings(context, newString);
                return newString;
            default:
                newString = allString.substring(0, position - 1) + allString.substring(position + length, Length);
                AppSharePreferences.setEatThings(context, newString);
                return newString;

        }

    }


}
