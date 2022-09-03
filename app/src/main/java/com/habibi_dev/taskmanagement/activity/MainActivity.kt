package com.habibi_dev.taskmanagement.activity

import android.os.Bundle
import androidx.activity.ComponentActivity
import androidx.activity.compose.setContent
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.material.Surface
import androidx.compose.runtime.CompositionLocalProvider
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.platform.LocalLayoutDirection
import androidx.compose.ui.unit.LayoutDirection
import androidx.core.view.WindowInsetsControllerCompat
import com.habibi_dev.taskmanagement.navigation.Navigation
import com.habibi_dev.taskmanagement.ui.theme.TaskManagementTheme

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        // color light NavigationBar
        WindowInsetsControllerCompat(window, window.decorView).isAppearanceLightNavigationBars =
            true
        setContent {
            TaskManagementTheme {
                CompositionLocalProvider(LocalLayoutDirection provides LayoutDirection.Rtl) {
                    Surface(
                        modifier = Modifier.fillMaxSize(),
                        color = Color(0xffF2F2F2),
                        content = { Navigation() }
                    )
                }
            }
        }
    }
}