const dataex = JSON.parse(`
[
    {
      id: 0,
      name: "ADIDAS C-16 AVEN Upright Bike",
      price: "24,900",
      pic: "assets/EX/0.png",
      info: "Let's burn your calories with this upright bike from ADIDAS,\
         proper in every levels of exercise. It's easy movement and use less\
          space. Warranty\
        2 years for motors\
        1 year for frames, woodened boards, electronic systems and technician fees",
    },
    {
      id: 1,
      name: "REEBOK EXERCISE Jet 300 Treadmill",
      price: "39,900",
      pic: "assets/EX/1.png",
      info: "The REEBOK Jet 300 treadmill features air motion technology which gives you effective cushioning to reduce the level of impact on your joints when running. Powered by a 2.5HP motor the REEBOK Jet 300 reaches a max speed of 20kph and can be set to 15 different incline levels for uphill training. With 27 programs in total, the Jet 300 gives you a wide range of workouts from high-intensity cardio to fat burning.",
    },
    {
      id: 2,
      name: "REEBOK Fitness Unisex Training Gloves",
      price: "690",
      pic: "assets/EX/2.png",
      info: "Shop the REEBOK Fitness Unisex Training Gloves at Supersports now!!\
\
        Lycra material providing comfort and flexibility\
        the suede palm provides a natural grip and protection when being used during strength based workouts\
        Speedwick technology encourages airflow whilst wicking sweat; keeping you cool and dry for focussed training\
        Integrated towelling material allows you to wipe away sweat for better grip and reduced irritation\
        Combine protection with a natural feel for weighted and bodyweight workouts\
        Grip non slip texture for added stability\
        Reebok training gloves\
        Model : RAGB-14516\
        \
        Color : Black",
    },
    {
      id: 3,
      name: "REEBOK Premium Skipping Rope",
      price: "990",
      pic: "assets/EX/3.png",
      info: "Shop the REEBOK Premium Skipping Rope at Supersports now!!\
\
        Made of highly durable materials\
        With a tangle-free ball bearing mechanism, the rope offers effortless rotations\
        Equipped with ergonomic handles with rubber contact points, the premium rope offers optimal grip\
        280cm long, the premium jump rope is easy to cut and adjust to fit your height\
        Made with a rubber feel, the string offers speed and precision for better cadence\
        Reebok skipping rope\
        Model : RARP-12021\
        \
        Color : Silver",
    },
    {
      id: 4,
      name: "REEBOK EXERCISE ZJET 430 Elliptical Trainer",
      price: "25,415",
      pic: "assets/EX/4.png",
      info: "The REEBOK ZJET 430 elliptical trainer is equipped with a 5.5-inch LCD display screen, showing the speed, time, pulse rate, calories, and distance,\
         etc. Eight levels of manual resistance adjustment and six console functions provide all the tools for effective workouts.\
          Fixed and dual-action handlebars with the integrated hand pulse sensors offer live heart-rate feedback for effective and efficient workouts.\
           This elliptical trainer has a sturdy construction that can support the user's weight of up to 120 kg., making it an alternative option for workouts to decrease excess fat,\
            get the body in shape, and also improve the work of the cardiovascular system.\
\
        Warranty\
        \
        2 years for motors\
        \
        1 year for frames, woodened boards, electronic systems and technician fees",
    },
    {
      id: 5,
      name: "ADIDAS ADBE-10238 Sit-Up Bench",
      price: "16,110",
      pic: "assets/EX/5.png",
      info: "The ADIDAS ADBE-10238 sit-up bench is made from strong and durable materials with\
       sturdy construction. It has a 4 cm thick seat cushion that can adjust the degree in 3\
        types: Incline, Decline and Flat. This ADIDAS versatile sit-up bench features a Preacher\
         Curl cushion for exercising upper arm (Biceps) and Leg Extension that can increase weight\
          plates up to 45 kg for thigh workout. It is perfect for workouts with dumbbells, barbells\
          , or other equipment such as the Power Rack.\
\
      Warranty\
      \
      2 years for motors\
      \
      1 year for frames, woodened boards, electronic systems and technician fees",
    },
    {
      id: 6,
      name: "ADIDAS Neoprene 2 Dumbbell",
      price: "490",
      pic: "assets/EX/6.png",
      info: "Having a slight advantage over cast iron or vinyl dumbbells when it comes to sweat,\
       the neoprene dumbbell's soft, smooth coating ensures the weight is less slippery when your\
        hands begin to perspire during your workout. Plus, the coating provides an aesthetically pleasing \
        look and doesn't cause damage to flooring.",
    },
    {
      id: 7,
      name: "NIKE Strength Training Belt",
      price: "990",
      pic: "assets/EX/7.png",
      info: "The NIKE Strength Training Belt features the foam core that\
       comfortably supports the lower back while doing squats or deadlifts.\
        The steel roller buckle keeps the belt securely in place. The anatomically\
         correct design encourages the proper lifting technique to help increase\
          safety\
      , confidence, and efficiency during weightlifting.",
    },
    {
      id: 8,
      name: "SOLE SC200 (2016) Eliptical",
      price: "52,425",
      pic: "assets/EX/8.png",
      info: "The SOLE SC200 (2016) stepper with a 16.8Lbs Flywheel features\
       a 6.5-inch LCD display screen showing the time, viscosity level, pulse rate,\
        speed, calories, and distance. This machine has a sturdy steel construction\
         that supports a maximum user's weight of up to 150kg. The intent of the SOLE SC200 (2016)\
          stepper is to provide a workout that focuses on the lower body, without \
          applying too much stress on the hip and knee joints. The idea behind \
          an arc trainer is to go hard and go fast, the ergonomically designed \
          stepper comes equipped with rubber-grip handlebars and corrosion-resistant\
           aluminum rails, \
      which add to the durability and sustainability of the SOLE stepper.",
    },
    {
      id: 9,
      name: "YORK 2429 20Kg Dumbbell Set",
      price: "1,795",
      pic: "assets/EX/9.png",
      info: "The YORK 2429 20 kg dumbbell set comes with a plastic \
      carry case with a handle for easy storage and portability and \
      contains a full-color exercise wallchart. This YORK dumbbell set\
       is made of hardened cast iron with sturdy construction. Its axis\
        has spinlock collars that have a rubber insert to ensure the weights\
         are secure. Additional YORK cast-iron plates can be bought separately \
      for extra customization to get the most out of your dumbbells.",
    },
    {
      id: 10,
      name: "HORIZON Comfort 3 Exercise Bike",
      price: "19,900",
      pic: "assets/EX/10.png",
      info: "The HORIZON Comfort 3 upright bike with a 7kg Flywheel\
       features a 5.5-inch LCD screen display and ECB Magnetic Brake\
        resistant system. This machine includes 10 working programs\
         that allow users to select to suit their workouts. The resistance\
          can electronically be adjusted up to 16 levels for intense workouts.\
           It is ideal for workouts to decrease excess fat, get the body in shape\
            and also\
       improve the work of the heart, blood, and lung system.",
    },
    {
      id: 11,
      name: "Hi-Speed Jump Rope",
      price: "343",
      pic: "assets/EX/11.png",
      info: "Take your cardiovascular workout to the next level and \
      achieve maximum jump speed with the PTP Hi-Speed Rope.",
    },
    {
      id: 12,
      name: "Mediband Medium Resistance Band",
      price: "273",
      pic: "assets/EX/12.png",
      info: "This is the best item for flexible after workout, \
      made of premium materials for support and durable. \
      It's will improve your mobility and muscle strength.",
    },
    {
      id: 13,
      name: "Hand Grips Loops",
      price: "245",
      pic: "assets/EX/13.png",
      info: "Improve hand opening/closing strength, tendon gliding, \
      motor coordination and stabilisation with the PTP Hand Grips.",
    },
    {
      id: 14,
      name: "S SPORTS SC-LHG6001A Weight Bench",
      price: "2,796",
      pic: "assets/EX/14.png",
      info: "S SPORTS SC-LHG6001A Weight Bench comes \
      with high-quality steel structure, included high-density\
       padded seat. Featuring 10-level adjustable backrest and\
        3-level adjustable seat allowing you to exercise according \
        to your body shape and exercise style. It can be converted into a\
         flat bench to support\
       exercise in the lying position whether sit-ups or lifting weights.",
    },
    {
      id: 15,
      name: "S SPORTS SC-PB300 Push Up Bar",
      price: "180",
      pic: "assets/EX/15.png",
      info: "The S SPORTS SC-PB300 Push Up Bar offers compact, \
      lightweight, and easy for portability. It is made of durable \
      construction, featuring a handle covered with soft PVC foam to\
       help grip and reduce wrist injuries while in use. This equipment\
        is a perfect choice\
       for exercise to help strengthen the chest, shoulder, and arm muscles.",
    },
    {
      id: 16,
      name: "S SPORTS SC-HH018 Hula Hoop",
      price: "441",
      pic: "assets/EX/16.png",
      info: "The S SPORTS SC-HH018 hula hoop is manufactured\
       from quality PVC with high durability that provides \
       a soft touch feel. This S SPORTS hula hoop is an ideal\
        workout accessory for exercise to\
       eliminate excess fat and helps improve heart and lung function better.",
    },
    {
      id: 17,
      name: "WORK OUT Twist Disc",
      price: "265",
      pic: "assets/EX/17.png",
      info: "The WORK OUT twist disc is an electric twist \
      disc that features a foot massage button function for\
       blood circulation stimulation. This twist disc is easy to\
        use, lightweight, and portable, allowing you to do workouts\
         anywhere, anytime. It is ideal for\
       abdominal, hip, and waist workouts.",
    },
    {
      id: 18,
      name: "AMAXS AX3333 Exercise Bike",
      price: "343",
      pic: "assets/EX/18.png",
      info: "The AMAXS AX3333 Upright Bike with a compact\
       design to suit any place. Featuring belt system to \
       create resistance by the magnetic system that can be\
        adjusted. Suitable for light or \
      moderate exercise that the elderly can also use.",
    },
    {
      id: 19,
      name: "YORK 10000 Vinyl Kettle Bell 2KG",
      price: "175",
      pic: "assets/EX/19.png",
      info: "YORK 10000 2kg. Kettlebell is made of\
       highly durable vinyl, featuring a non-slip ergonomic\
        grip that provides convenience during workouts. This \
        kettlebell can be used to exercise many parts of the body\
         such as arms, legs, shoulders, etc. It is suitable for adding weight to\
       increase intensity in training or exercise.",
    },
    {
      id: 20,
      name: "FUSEN T-United B-4000 Home Gym",
      price: "23,715",
      pic: "assets/EX/20.png",
      info: "The FUSEN T-United B-4000 multifunctional\
       home gym features an innovative and sturdy steel\
        construction that combines arm and leg stations. \
        This equipment has a locking system for maximum safety\
         while in use and allows you to decrease or increase the weight\
          plate as needed for your intense workouts. It is great for strengthening\
           muscle\
       groups and achieving comprehensive total-body workouts.",
    },
  ]
`);