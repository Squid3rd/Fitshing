-- MySQL dump 10.13  Distrib 8.0.32, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: fitshing
-- ------------------------------------------------------
-- Server version	8.0.32

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `ex_image`
--

DROP TABLE IF EXISTS `ex_image`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ex_image` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `file_path` varchar(255) NOT NULL,
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `ex_id` int NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ex_image`
--

LOCK TABLES `ex_image` WRITE;
/*!40000 ALTER TABLE `ex_image` DISABLE KEYS */;
INSERT INTO `ex_image` VALUES (1,'\\uploads\\exercise\\0.png','2023-04-30 00:39:43',1),(2,'\\uploads\\exercise\\1.png','2023-04-30 00:39:43',2),(3,'\\uploads\\exercise\\2.png','2023-04-30 00:39:43',3),(4,'\\uploads\\exercise\\3.png','2023-04-30 00:39:43',4),(5,'\\uploads\\exercise\\4.png','2023-04-30 00:39:43',5),(6,'\\uploads\\exercise\\5.png','2023-04-30 00:39:43',6),(7,'\\uploads\\exercise\\6.png','2023-04-30 00:39:43',7),(8,'\\uploads\\exercise\\7.png','2023-04-30 00:39:43',8),(9,'\\uploads\\exercise\\8.png','2023-04-30 00:39:43',9),(10,'\\uploads\\exercise\\9.png','2023-04-30 00:39:43',10),(11,'\\uploads\\exercise\\10.png','2023-04-30 00:39:43',11),(12,'\\uploads\\exercise\\11.png','2023-04-30 00:39:43',12),(13,'\\uploads\\exercise\\12.png','2023-04-30 00:39:43',13),(14,'\\uploads\\exercise\\13.png','2023-04-30 00:39:43',14),(15,'\\uploads\\exercise\\14.png','2023-04-30 00:39:43',15),(16,'\\uploads\\exercise\\15.png','2023-04-30 00:39:43',16),(17,'\\uploads\\exercise\\16.png','2023-04-30 00:39:43',17),(18,'\\uploads\\exercise\\17.png','2023-04-30 00:39:43',18),(19,'\\uploads\\exercise\\18.png','2023-04-30 00:39:43',19),(20,'\\uploads\\exercise\\19.png','2023-04-30 00:39:43',20),(21,'\\uploads\\exercise\\20.png','2023-04-30 00:39:43',21);
/*!40000 ALTER TABLE `ex_image` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ex_type`
--

DROP TABLE IF EXISTS `ex_type`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ex_type` (
  `id` int NOT NULL,
  `typeofproduct` varchar(255) NOT NULL DEFAULT '5',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ex_type`
--

LOCK TABLES `ex_type` WRITE;
/*!40000 ALTER TABLE `ex_type` DISABLE KEYS */;
INSERT INTO `ex_type` VALUES (1,'Exercise bike'),(2,'Rowing machine'),(3,'Weight bench'),(4,'Treadmill'),(5,'Dumbbell'),(6,'Body Weight'),(7,'Rubber bands'),(8,'Jump rope'),(9,'Hula hoop'),(10,'Gloves');
/*!40000 ALTER TABLE `ex_type` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `exercise`
--

DROP TABLE IF EXISTS `exercise`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `exercise` (
  `ex_id` int unsigned NOT NULL AUTO_INCREMENT,
  `ex_name` varchar(255) NOT NULL,
  `ex_info` varchar(255) DEFAULT NULL,
  `amount` int NOT NULL DEFAULT '0',
  `ex_price` float(8,2) NOT NULL DEFAULT '0.00',
  `type1` varchar(45) NOT NULL DEFAULT '6',
  PRIMARY KEY (`ex_id`),
  UNIQUE KEY `ex_id_UNIQUE` (`ex_id`)
) ENGINE=InnoDB AUTO_INCREMENT=103 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `exercise`
--

LOCK TABLES `exercise` WRITE;
/*!40000 ALTER TABLE `exercise` DISABLE KEYS */;
INSERT INTO `exercise` VALUES (1,'ADIDAS C-16 AVEN Upright Bike','Let\'s burn your calories with this upright bike from ADIDAS, proper in every levels of exercise. It\'s easy movement and use less space. Warranty 2 years for motors 1 year for frames, woodened boards, electronic systems and technician fees',5,24900.00,'1'),(2,'REEBOK EXERCISE Jet 300 Treadmill','The REEBOK Jet 300 treadmill features air motion technology which gives you effective cushioning to reduce the level of impact on your joints when running. Powered by a 2.5HP motor the REEBOK Jet 300 reaches a max speed of 20kph and can be set to 15 diffe',5,39900.00,'4'),(3,'REEBOK Fitness Unisex Training Gloves','Shop the REEBOK Fitness Unisex Training Gloves at Supersports now!! Lycra material providing comfort and flexibility the suede palm provides a natural grip and protection when being used during strength based workouts Speedwick technology encourages airfl',5,690.00,'10'),(4,'REEBOK Premium Skipping Rope','Shop the REEBOK Premium Skipping Rope at Supersports now!! Made of highly durable materials With a tangle-free ball bearing mechanism, the rope offers effortless rotations Equipped with ergonomic handles with rubber contact points, the premium rope offers',5,990.00,'8'),(5,'REEBOK EXERCISE ZJET 430 Elliptical Trainer','The REEBOK ZJET 430 elliptical trainer is equipped with a 5.5-inch LCD display screen, showing the speed, time, pulse rate, calories, and distance, etc. Eight levels of manual resistance adjustment and six console functions provide all the tools for effec',5,25415.00,'1'),(6,'ADIDAS ADBE-10238 Sit-Up Bench','The ADIDAS ADBE-10238 sit-up bench is made from strong and durable materials with sturdy construction. It has a 4 cm thick seat cushion that can adjust the degree in 3 types: Incline, Decline and Flat. This ADIDAS versatile sit-up bench features a Preache',5,16110.00,'3'),(7,'ADIDAS Neoprene 2 Dumbbell','Having a slight advantage over cast iron or vinyl dumbbells when it comes to sweat,the neoprene dumbbells',5,490.00,'5'),(8,'NIKE Strength Training Belt','Strength Training Belt features the foam core that comfortably supports the lower back while doing squats or deadlifts.The steel roller buckle keeps the belt securely in place. The anatomically correct design encourages the proper lifting technique to hel',5,990.00,'6'),(9,'SOLE SC200 (2016) Eliptical','The SOLE SC200 (2016) stepper with a 16.8Lbs Flywheel features a 6.5-inch LCD display screen showing the time, viscosity level, pulse rate, speed, calories, and distance. This machine has a sturdy steel construction that supports a maximum user\'s weight o',5,52425.00,'1'),(10,'YORK 2429 20Kg Dumbbell Set','The YORK 2429 20 kg dumbbell set comes with a plastic carry case with a handle for easy storage and portability and contains a full-color exercise wallchart. This YORK dumbbell set is made of hardened cast iron with sturdy construction. Its axis has spinl',5,1795.00,'5'),(11,'HORIZON Comfort 3 Exercise Bike','The HORIZON Comfort 3 upright bike with a 7kg Flywheel features a 5.5-inch LCD screen display and ECB Magnetic Brake resistant system. This machine includes 10 working programs that allow users to select to suit their workouts. The resistance can electron',5,19900.00,'1'),(12,'Hi-Speed Jump Rope','Take your cardiovascular workout to the next level and achieve maximum jump speed with the PTP Hi-Speed Rope.',5,343.00,'8'),(13,'Mediband Medium Resistance Band','This is the best item for flexible after workout, made of premium materials for support and durable. It\'s will improve your mobility and muscle strength.',5,273.00,'6'),(14,'Hand Grips Loops','Improve hand opening/closing strength, tendon gliding, motor coordination and stabilisation with the PTP Hand Grips.',5,245.00,'7'),(15,'S SPORTS SC-LHG6001A Weight Bench','S SPORTS SC-LHG6001A Weight Bench comes with high-quality steel structure, included high-density padded seat. Featuring 10-level adjustable backrest and 3-level adjustable seat allowing you to exercise according to your body shape and exercise style. It c',5,2796.00,'3'),(16,'S SPORTS SC-PB300 Push Up Bar','The S SPORTS SC-PB300 Push Up Bar offers compact, lightweight, and easy for portability. It is made of durable construction, featuring a handle covered with soft PVC foam to help grip and reduce wrist injuries while in use. This equipment is a perfect cho',5,180.00,'6'),(17,'S SPORTS SC-HH018 Hula Hoop','The S SPORTS SC-HH018 hula hoop is manufactured from quality PVC with high durability that provides a soft touch feel. This S SPORTS hula hoop is an ideal workout accessory for exercise to eliminate excess fat and helps improve heart and lung function bet',5,441.00,'9'),(18,'WORK OUT Twist Disc','The WORK OUT twist disc is an electric twist disc that features a foot massage button function for blood circulation stimulation. This twist disc is easy to use, lightweight, and portable, allowing you to do workouts anywhere, anytime. It is ideal for abd',5,265.00,'6'),(19,'AMAXS AX3333 Exercise Bike','The AMAXS AX3333 Upright Bike with a compact design to suit any place. Featuring belt system to create resistance by the magnetic system that can be adjusted. Suitable for light or moderate exercise that the elderly can also use.',5,343.00,'1'),(20,'YORK 10000 Vinyl Kettle Bell 2KG','YORK 10000 2kg. Kettlebell is made of highly durable vinyl, featuring a non-slip ergonomic grip that provides convenience during workouts. This kettlebell can be used to exercise many parts of the body such as arms, legs, shoulders, etc. It is suitable fo',5,175.00,'6'),(21,'FUSEN T-United B-4000 Home Gym','The FUSEN T-United B-4000 multifunctional home gym features an innovative and sturdy steel construction that combines arm and leg stations.This equipment has a locking system for maximum safety while in use and allows you to decrease or increase the weigh',5,23715.00,'3');
/*!40000 ALTER TABLE `exercise` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_purchase`
--

DROP TABLE IF EXISTS `order_purchase`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_purchase` (
  `o_id` int unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `amount` int NOT NULL,
  `total_price` float(8,2) NOT NULL,
  `status` tinyint(1) NOT NULL,
  `u_id` int NOT NULL,
  PRIMARY KEY (`o_id`),
  UNIQUE KEY `o_id_UNIQUE` (`o_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_purchase`
--

LOCK TABLES `order_purchase` WRITE;
/*!40000 ALTER TABLE `order_purchase` DISABLE KEYS */;
/*!40000 ALTER TABLE `order_purchase` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `payment`
--

DROP TABLE IF EXISTS `payment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `payment` (
  `p_id` int unsigned NOT NULL AUTO_INCREMENT,
  `slip_info` varchar(255) NOT NULL,
  `amount` int NOT NULL,
  `date` varchar(255) NOT NULL,
  `total_price` float(8,2) NOT NULL,
  `u_id` int NOT NULL,
  `o_id` int NOT NULL,
  PRIMARY KEY (`p_id`),
  UNIQUE KEY `p_id_UNIQUE` (`p_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payment`
--

LOCK TABLES `payment` WRITE;
/*!40000 ALTER TABLE `payment` DISABLE KEYS */;
/*!40000 ALTER TABLE `payment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `request`
--

DROP TABLE IF EXISTS `request`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `request` (
  `r_id` int unsigned NOT NULL AUTO_INCREMENT,
  `request_info` varchar(255) NOT NULL,
  `status` tinyint(1) NOT NULL DEFAULT '0',
  `u_id` int NOT NULL,
  `t_id` int NOT NULL,
  PRIMARY KEY (`r_id`),
  UNIQUE KEY `r_id_UNIQUE` (`r_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `request`
--

LOCK TABLES `request` WRITE;
/*!40000 ALTER TABLE `request` DISABLE KEYS */;
/*!40000 ALTER TABLE `request` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tokens`
--

DROP TABLE IF EXISTS `tokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tokens` (
  `id` int NOT NULL,
  `token` varchar(255) NOT NULL,
  `u_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `token_UNIQUE` (`token`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tokens`
--

LOCK TABLES `tokens` WRITE;
/*!40000 ALTER TABLE `tokens` DISABLE KEYS */;
/*!40000 ALTER TABLE `tokens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `trainer`
--

DROP TABLE IF EXISTS `trainer`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `trainer` (
  `t_id` int unsigned NOT NULL AUTO_INCREMENT,
  `fname` int NOT NULL,
  `lname` int NOT NULL,
  `info` int NOT NULL,
  `u_id` int NOT NULL,
  PRIMARY KEY (`t_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `trainer`
--

LOCK TABLES `trainer` WRITE;
/*!40000 ALTER TABLE `trainer` DISABLE KEYS */;
/*!40000 ALTER TABLE `trainer` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `u_image`
--

DROP TABLE IF EXISTS `u_image`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `u_image` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `file_path` varchar(255) DEFAULT NULL,
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `u_id` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `u_image`
--

LOCK TABLES `u_image` WRITE;
/*!40000 ALTER TABLE `u_image` DISABLE KEYS */;
/*!40000 ALTER TABLE `u_image` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `fname` varchar(255) NOT NULL,
  `lname` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `phone` varchar(255) NOT NULL,
  `gender` varchar(255) NOT NULL,
  `status` int DEFAULT '0',
  `image` varchar(255) DEFAULT NULL,
  `role` varchar(255) DEFAULT 'user',
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (14,'Admin','$2b$05$ezUToai4UUj.YPhCx.tVh.xKEwphVYmzTeobMZ84kNG1NVywknmd.','Admin','Admin','admin@admin.admin','0123456789','Female',0,'static\\uploads\\user\\images-1682809283619.png','admin');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-04-30 14:51:36
