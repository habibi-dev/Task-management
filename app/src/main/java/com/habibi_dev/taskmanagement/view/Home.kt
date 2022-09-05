package com.habibi_dev.taskmanagement.view

import androidx.compose.foundation.layout.*
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import com.habibi_dev.taskmanagement.component.Drawer
import com.habibi_dev.taskmanagement.component.Header


@Composable
fun Home() {
    val scaffoldState = rememberScaffoldState()

    Scaffold(
        scaffoldState = scaffoldState,
        topBar = { Header(state = scaffoldState) },
        drawerContent = { Drawer() },
        drawerBackgroundColor = Color(0xffffffff)
    ) {
        Column(modifier = Modifier.verticalScroll(rememberScrollState())) {

        }
    }
}