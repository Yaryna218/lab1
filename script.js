function triangle(element1, type1, element2, type2){
    const validTypes=["leg", "hypotenuse", "adjacent angle", "opposite angle", "angle"];
    if(!validTypes.includes(type1)|| !validTypes.includes(type2)){
        console.log("Не првильно введений тип");
        return "failed";
    }

    if(type1==="hypotenuse" && type2==="hypotenuse"){
        console.log("типи не можуть бути одинакові");
        return "failed";
    }
    

    let sideA = 0, sideB = 0, hypotenuse = 0, angleA = 0, angleB = 0;

    if ((type1 === "hypotenuse" && element1 <= 0) || (type2 === "hypotenuse" && element2 <= 0)) {
        return "Error: Гіпотенуза повинна бути більше нуля";
    }
    if ((type1 === "leg" && element1 <= 0) || (type2 === "leg" && element2 <= 0)) {
        return "Error: Катет повинен бути більше нуля";
    }
    if ((type1.includes("angle") && (element1 <= 0 || element1 >= 90)) || 
        (type2.includes("angle") && (element2 <= 0 || element2 >= 90))) {
        return "Error: Кут повинен бути в діапазоні (0, 90) градусів";
    }

    if (type1 === "leg" && type2 === "leg") {
        // обидва елементи - катети
        sideA = element1;
        sideB = element2;
        hypotenuse = Math.sqrt(sideA ** 2 + sideB ** 2);
        angleA = Math.atan(sideA / sideB) * (180 / Math.PI);
        angleB = 90 - angleA;
    } else if (type1 === "leg" && type2 === "hypotenuse") {
        // перший елемент - катет, а другий - гіпотенуза
        sideA = element1;
        hypotenuse = element2;
        if (sideA >= hypotenuse) return "Error: Катет повинен бути меншим за гіпотенузу";
        sideB = Math.sqrt(hypotenuse ** 2 - sideA ** 2);
        angleA = Math.atan(sideA / sideB) * (180 / Math.PI);
        angleB = 90 - angleA;
    } else if (type1 === "hypotenuse" && type2 === "leg") {
        // перший елемент - гіпотенуза, а другий - катет
        hypotenuse = element1;
        sideA = element2;
        if (sideA >= hypotenuse) return "Error: Катет повинен бути меншим за гіпотенузу";
        sideB = Math.sqrt(hypotenuse ** 2 - sideA ** 2);
        angleA = Math.atan(sideA / sideB) * (180 / Math.PI);
        angleB = 90 - angleA;
    } else if (type1 === "opposite angle" && type2 === "leg") {
        let oppositeAngle = element1 * (Math.PI / 180); 
        let leg = element2; 
        hypotenuse = leg / Math.sin(oppositeAngle); 
        angleB = 90 - element1; 
        angleA = element1;         
        sideB = Math.sqrt(Math.pow(hypotenuse, 2) - Math.pow(leg, 2));
        sideA = leg;
    } else if (type1 === "leg" && type2 === "opposite angle") {
        let oppositeAngle = element2 * (Math.PI / 180);
        let leg = element1;
        hypotenuse = leg / Math.sin(oppositeAngle);
        angleB = 90 - element2;
        angleA = element2;
        sideB = Math.sqrt(Math.pow(hypotenuse, 2) - Math.pow(leg, 2));
        sideA = leg;
    } else if (type1 === "angle" && type2 === "hypotenuse") {
        // перший елемент - гострий кут, а другий - гіпотенуза
        hypotenuse = element2;
        let givenAngle = element1;
        angleA = givenAngle;
        angleB = 90 - angleA;
        sideA = hypotenuse * Math.sin(angleA * (Math.PI / 180));
        sideB = hypotenuse * Math.cos(angleA * (Math.PI / 180));
    } else if (type1 === "hypotenuse" && type2 === "angle") {
        // перший елемент - гіпотенуза, а другий - гострий кут
        hypotenuse = element1;
        angleA = element2;
        angleB = 90 - angleA;
        sideA = hypotenuse * Math.sin(angleA * (Math.PI / 180));
        sideB = hypotenuse * Math.cos(angleA * (Math.PI / 180));
    } else if (type1 === "adjacent angle" && type2 === "leg") {
        const adjacentAngle = element1;
        sideB = element2;
        sideA = sideB * Math.tan(adjacentAngle * (Math.PI / 180));
        hypotenuse = Math.sqrt(sideA ** 2 + sideB ** 2);
        angleA = adjacentAngle;
        angleB = 90 - adjacentAngle;
    } else if (type1 === "leg" && type2 === "adjacent angle") {
        // перший елемент - катет, а другий - прилеглий кут
        const adjacentAngle = element2;
        sideB = element1;
        sideA = sideB * Math.tan(adjacentAngle * (Math.PI / 180));
        hypotenuse = Math.sqrt(sideA ** 2 + sideB ** 2);
        angleA = adjacentAngle;
        angleB = 90 - adjacentAngle;
    } else {
        console.log("Введено невірні типи.");
        return "failed";
    }
    if (hypotenuse <= 0 || sideA <= 0 || sideB <= 0) {
        return "Error: Значення сторін повинні бути більше нуля";
    }

    // Вивід результатів
    console.log("Сторони трикутника:");
    console.log("a = " + sideA);
    console.log("b = " + sideB);
    console.log("c = " + hypotenuse);
    console.log("alpha = " + angleA.toFixed(2) + " градусів");
    console.log("beta = " + angleB.toFixed(2) + " градусів");

    return "success";
}

console.log(triangle(10, "leg", 10, "leg"));
console.log(triangle(10, "leg", 15, "hypotenuse"));
console.log(triangle(15, "hypotenuse", 10, "leg"));
console.log(triangle(30, "opposite angle", 10, "leg"));
console.log(triangle(10, "leg", 30, "opposite angle"));
console.log(triangle(30, "angle", 15, "hypotenuse"));
console.log(triangle(15, "hypotenuse", 30, "angle"));
console.log(triangle(30, "adjacent angle", 10, "leg"));
console.log(triangle(10, "leg", 30, "adjacent angle"));
