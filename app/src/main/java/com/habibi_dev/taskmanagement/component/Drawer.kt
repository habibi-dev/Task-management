package com.habibi_dev.taskmanagement.component

import androidx.compose.foundation.layout.padding
import androidx.compose.material.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp


@Composable
fun Drawer() {
    Text(modifier = Modifier.padding(16.dp), text = "First line")
    Text(modifier = Modifier.padding(16.dp), text = "Second line")
    Text(modifier = Modifier.padding(16.dp), text = "Third line")
}
