package com.habibi_dev.taskmanagement.ui.theme

import androidx.compose.material.Typography
import androidx.compose.ui.text.TextStyle
import androidx.compose.ui.text.font.Font
import androidx.compose.ui.text.font.FontFamily
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.sp
import com.habibi_dev.taskmanagement.R

// Set of Material typography styles to start with
val Typography = Typography(
    body1 = TextStyle(
        fontFamily = FontFamily(
            Font(
                R.font.vazirmatn_regular,
                FontWeight.Normal
            ),
            Font(
                R.font.vazirmatn_bold,
                FontWeight.Bold
            ),
            Font(
                R.font.vazirmatn_light,
                FontWeight.Light
            )
        ),
        fontWeight = FontWeight.Normal,
        fontSize = 16.sp
    )
)