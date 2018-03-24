package com.jackykeke.whattoeat.app;

import android.content.Context;
import android.content.SharedPreferences;

/**
 * 作者：JackyKeke on 2018/3/22 23:00
 * 邮箱：kyl794106786@gmail.com
 * github:https://github.com/JackyKeke
 * desc:
 */
public class AppSharePreferences {


    private static SharedPreferences setting;

    private static SharedPreferences getSP(Context context) {
        return context.getSharedPreferences(AppContants.SYS_SHAREDPREF, 0);
    }


    public static String getEatThings(Context context) {
        setting = getSP(context);
        return setting.getString(AppContants.EAT_THINGS, "");
    }

    public static void setEatThings(Context context, String string) {
        setting = getSP(context);
        setting.edit().putString(AppContants.EAT_THINGS, string);
    }
}
