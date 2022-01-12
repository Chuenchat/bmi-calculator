import React, {useState} from 'react'
import { 
    Stack, Box, 
    Select, InputLabel, MenuItem,
    Input, Button,
    FormControl, FormHelperText
} from '@mui/material';
  
function isFloat(n) {
    return parseFloat(n.match(/^-?\d*(\.\d+)?$/))>0;
}

const Page = () => {

    const [parameters, setParameters] = useState({
        'gender': 'male',
        'height': null,
        'weight': null,
    })
    const [result, setResult] = useState("")

    const handleGenderFill = (event) => {
        setParameters({
            ...parameters, 
            'gender': event.target.value
        })
    }

    const handleHeightFill = (event) => {
        setParameters({
            ...parameters, 
            'height': event.target.value
        })
    }

    const handleWeightFill = (event) => {
        setParameters({
            ...parameters, 
            'weight': event.target.value
        })
    }

    const handleSubmit = (event) => {
        var h = parameters.height;
        var w = parameters.weight;
        if (isFloat(w) && isFloat(h)) {
            const g = parameters.gender;
            h = parseFloat(h);
            w = parseFloat(w);
            const bmi = w / h / h
            console.log('bmi', bmi)
            var text = 'BMI = ' + bmi.toFixed(2) + ' | ';
            if (g === 'male') {
                if (bmi < 19) {
                    text += "ผอมบาง"
                } else if (bmi < 25) {
                    text += "พอเหมาะ"
                } else if (bmi < 30) {
                    text += "น้ำหนักเกิน"
                } else {
                    text += "เป็นโรคอ้วน"
                }
            } else if (g === 'female') {
                if (bmi < 18) {
                    text += "ผอมบาง"
                } else if (bmi < 24) {
                    text += "พอเหมาะ"
                } else if (bmi < 30) {
                    text += "น้ำหนักเกิน"
                } else {
                    text += "เป็นโรคอ้วน"
                }
            }
            setResult(text)
        } else {
            setResult("คุณใส่ค่าผิดคับ")
        }
    }

    return (
        <Stack style={{padding: '5%'}} spacing={5}>
            
            <Box style={{fontSize: 30}}>
                BMI Calculator
            </Box>

            <FormControl variant="standard" sx={{ minWidth: 120 }}>
              <InputLabel>Gender</InputLabel>
              <Select
                value={parameters.gender}
                onChange={handleGenderFill}
              >
                <MenuItem value={"male"}>Male</MenuItem>
                <MenuItem value={"female"}>Female</MenuItem>
              </Select>
            </FormControl>

            <FormControl variant="standard" sx={{ minWidth: 120 }}>
                <InputLabel htmlFor="my-input">Height</InputLabel>
                <Input id="my-input" aria-describedby="my-helper-text"
                    onChange={handleHeightFill}
                />
                <FormHelperText id="my-helper-text">Metre will do.</FormHelperText>
            </FormControl>

            <FormControl variant="standard" sx={{ minWidth: 120 }}>
                <InputLabel htmlFor="my-input">Weight</InputLabel>
                <Input id="my-input" aria-describedby="my-helper-text" 
                    onChange={handleWeightFill}
                />
                <FormHelperText id="my-helper-text">In kilogram please.</FormHelperText>
            </FormControl>

            <Button variant="contained" onClick={handleSubmit} > Let's me think... </Button>

            { result &&
                <Box style={{backgroundColor: 'orange', padding: 15}}>
                    {result}
                </Box>
            }

        </Stack>
    )
}

export default Page;