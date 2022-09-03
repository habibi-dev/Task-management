package com.habibi_dev.taskmanagement.component

import androidx.compose.foundation.Image
import androidx.compose.foundation.layout.*
import androidx.compose.material.*
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.res.painterResource
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.habibi_dev.taskmanagement.R

@Composable
fun Header(title: String = "") {
    TopAppBar(
        backgroundColor = Color.Transparent,
        elevation = 0.dp,
        modifier = Modifier.fillMaxWidth(),
    ) {
        Row(modifier = Modifier.fillMaxWidth(), Arrangement.SpaceBetween, verticalAlignment = Alignment.CenterVertically) {
            Right()
            Title(title)
            Left()
        }
    }
}

@Composable
private fun Left() {
    IconButton(onClick = { }, enabled = true) {
        Icon(
            painter = painterResource(R.drawable.ic_log_in),
            contentDescription = ""
        )
    }
}

@Composable
private fun Right() {
    IconButton(onClick = { }, enabled = true) {
        Icon(
            painter = painterResource(R.drawable.ic_menu),
            contentDescription = ""
        )
    }
}

@Composable
fun Title(title: String = "") {
    if (title.isEmpty()) {
        return Image(
            painter = painterResource(R.drawable.ic_task_management),
            contentDescription = "ic_task_management",
        )
    }

    return Text(text = title, fontSize = 18.sp, fontWeight = FontWeight.Light)
}