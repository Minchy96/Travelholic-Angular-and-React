-- MySQL dump 10.13  Distrib 5.6.17, for Win64 (x86_64)
--
-- Host: localhost    Database: travel
-- ------------------------------------------------------
-- Server version	5.6.22-log

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `city`
--

DROP TABLE IF EXISTS `city`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `city` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `country_id` int(11) NOT NULL,
  `name` varchar(45) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_city_country_idx` (`country_id`),
  CONSTRAINT `fk_city_country` FOREIGN KEY (`country_id`) REFERENCES `country` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `city`
--

LOCK TABLES `city` WRITE;
/*!40000 ALTER TABLE `city` DISABLE KEYS */;
INSERT INTO `city` VALUES (2,3,'Pariz'),(3,2,'Rim'),(10,11,'Bangkok'),(22,2,'Palermo'),(25,25,'Valeta'),(26,26,'Istanbul'),(29,29,'Stokholm');
/*!40000 ALTER TABLE `city` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `comment`
--

DROP TABLE IF EXISTS `comment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `comment` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `user_id` int(11) NOT NULL,
  `post_id` int(11) NOT NULL,
  `text` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_comment_user1_idx` (`user_id`),
  KEY `fk_comment_post1_idx` (`post_id`),
  CONSTRAINT `fk_comment_post1` FOREIGN KEY (`post_id`) REFERENCES `post` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_comment_user1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=85 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `comment`
--

LOCK TABLES `comment` WRITE;
/*!40000 ALTER TABLE `comment` DISABLE KEYS */;
INSERT INTO `comment` VALUES (20,1,9,'Jao dodao sam u fav, tako da pratim post!'),(24,9,10,'Potrebno je da nas je 4, za popust karte'),(25,10,9,'Ovo deluje zanimljivo! Da li je diirektan let?'),(29,2,12,'Takse su uracunate u cenu!'),(62,2,35,'Jao, ovo je nesto!'),(64,2,39,'Pero, mnogo mi se svidja ovo!'),(65,1,39,'Miko, skupimo ekipu! :)'),(66,2,40,'Hahah Miko ovo sam i ja pronasao, pogledaj moj poslednji post!'),(84,1,10,'super!');
/*!40000 ALTER TABLE `comment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `country`
--

DROP TABLE IF EXISTS `country`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `country` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `country`
--

LOCK TABLES `country` WRITE;
/*!40000 ALTER TABLE `country` DISABLE KEYS */;
INSERT INTO `country` VALUES (2,'Italija'),(3,'Francuska'),(11,'Tajland'),(25,'Malta'),(26,'Turska'),(29,'Svedska');
/*!40000 ALTER TABLE `country` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `favorite`
--

DROP TABLE IF EXISTS `favorite`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `favorite` (
  `user_id` int(11) NOT NULL,
  `post_id` int(11) NOT NULL,
  PRIMARY KEY (`user_id`,`post_id`),
  KEY `fk_user_has_post_post1_idx` (`post_id`),
  KEY `fk_user_has_post_user1_idx` (`user_id`),
  CONSTRAINT `fk_user_has_post_post1` FOREIGN KEY (`post_id`) REFERENCES `post` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_user_has_post_user1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `favorite`
--

LOCK TABLES `favorite` WRITE;
/*!40000 ALTER TABLE `favorite` DISABLE KEYS */;
INSERT INTO `favorite` VALUES (1,9),(9,9),(10,9),(8,10);
/*!40000 ALTER TABLE `favorite` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `photos`
--

DROP TABLE IF EXISTS `photos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `photos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `post_id` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_photos_post1_idx` (`post_id`),
  CONSTRAINT `fk_photos_post1` FOREIGN KEY (`post_id`) REFERENCES `post` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `photos`
--

LOCK TABLES `photos` WRITE;
/*!40000 ALTER TABLE `photos` DISABLE KEYS */;
INSERT INTO `photos` VALUES (3,'4928.jpg',35),(4,'palermo-sicily-italy-shutterstock_740152744.jpg',35),(5,'palermo-sicily.jpg',35),(8,'960x0.jpg',39),(9,'gettyimages-471758019.jpg',39),(10,'16_10 (1).jpg',10),(11,'pariz-i-disneyland-popustplus0_5bacdbff0143b.jpg',10),(12,'Pariz-noću.jpg',10),(13,'16_10.jpg',12),(14,'belvi-italija-rim-07.jpg',12),(15,'2_54.jpg',9),(16,'bangkok-tajland-grad.jpg',9),(17,'site_0356_0047-750-0-20151105154645.jpg',40),(18,'istanbul1.jpg',40),(19,'images.jpg',41),(20,'5ba3b4fd0f254324480b1066.jpg',41),(21,'istanbul-Sultan-Ahmed-Mosque-1112x630.jpg',41),(28,'stockholm-travel-guide.jpg',47),(29,'stockholm-pass-worth-it.jpg',47),(30,'GettyImages_836231844.0.jpg',47);
/*!40000 ALTER TABLE `photos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `post`
--

DROP TABLE IF EXISTS `post`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `post` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `city_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `description` varchar(255) NOT NULL,
  `title` varchar(45) NOT NULL,
  `start` date NOT NULL,
  `end` date NOT NULL,
  `amount` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_post_city1_idx` (`city_id`),
  KEY `fk_post_user1_idx` (`user_id`),
  CONSTRAINT `fk_post_city1` FOREIGN KEY (`city_id`) REFERENCES `city` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_post_user1` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE=InnoDB AUTO_INCREMENT=49 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `post`
--

LOCK TABLES `post` WRITE;
/*!40000 ALTER TABLE `post` DISABLE KEYS */;
INSERT INTO `post` VALUES (9,10,8,'Hajde neko sa mnom na Tajland, nasla sam suuuuoer jeftinu ponudu! Cena aviona je jako jeftina, valjda neka akcija. :) Pa brzo dok ne odleti.','Tajland','2019-08-12','2019-08-28',650),(10,2,9,'Hotel, 20ak minuta udaljen od centra Pariza. (doplata za dorucak i veceru, 6e dnevno). Put avionom, u cenu uracunate sve takse. Pitajte slobno ya dodatne informacije.','Vikend u Parizu','2019-07-04','2019-07-06',180),(12,3,2,'U samom centru Rima, hoce neko sa mnom, nasla sam super ponudu! 4 nocenja sa doruckom, putuje se avionom iz Beograda.','Rim','2019-07-25','2019-07-29',160),(35,22,1,'Avionom, ali sa aerodroma u Budimpesti. (moguce organizovati prevoz do Budimpeste kombijem - 50e). \n5 nocenja u hostelu, sa doruckom\nNema doplate za prtljag do 20kg, vanzo naglasiti!\n','Putovanje u Palermo','2019-10-20','2019-10-25',90),(39,25,1,'Iznamljuje se kuca za samo 80e na dan. (CELA KUCA 80e). Blizu je plaze, nekih 100m.  Putuje se avionom, iz BG. (takse uracunate u cenu). Za vise inf saljite mejl!','Putovanje na Maltu!','2019-08-18','2019-09-29',190),(40,26,2,'Istanbul u septembru, avionom (bez ikakvih doplata), hostel na 700m od plave dzamije, znaci sami centar! Ako vas jos nesto zanima, saljite pitanja na mejl!  ','Istanbul u septembru','2019-09-22','2019-09-29',150),(41,26,1,'Istanbul u septembru, avionom (bez ikakvih doplata), hostel na 700m od plave dzamije, znaci sami centar! Ako vas jos nesto zanima, saljite pitanja na mejl!  ','Putovanje u Istanbul','2019-09-22','2019-09-29',160),(47,29,2,'U centru Stokholma, 5 dana, veoma jeftino','Svedska','2019-09-30','2019-10-05',120);
/*!40000 ALTER TABLE `post` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(45) NOT NULL,
  `firstName` varchar(45) NOT NULL,
  `lastName` varchar(45) NOT NULL,
  `birthDate` date NOT NULL,
  `address` varchar(45) NOT NULL,
  `caption` varchar(45) DEFAULT NULL,
  `password` varchar(45) NOT NULL,
  `email` varchar(45) NOT NULL,
  `imageName` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username_UNIQUE` (`username`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'peki','Pero','Peric','1996-07-07','Bulevar Oslobodjenja 78','Ljubitelj putovanja!','1234','pero@gmail.com','lisabon.jpg'),(2,'mika','Mika','Milicevic','1990-02-02','Mire Popara 2','Putoholicarka','1234','miki@gmail.com','kofer_cover-800x660.jpeg'),(8,'laura12','Laura','Lazic','2019-06-09','Gogoljeva 20','Volim da putujem, avanturista u dusi','123','mina.bje96@gmail.com',NULL),(9,'laki','Lara','Lazarevic','2009-02-10','Gogoljeva 14','Volim da putujem','1234','mina.bje96@gmail.com',NULL),(10,'miki1','Mika','Lazic','2009-05-12','Tolstojeva 4, Novi Sad','Svuda podji, kuci dodji.','123','mikilaki@gmail.com',NULL),(11,'miki','Mina','Bjelica','2019-06-12','Gogoljeva 14','1','1','mina.bje96@gmail.com',NULL),(13,'p','Novica','Bjelica','2019-07-06','Gogoljeva 14','dd','ddd','mina.bje96@gmail.com',NULL),(14,'mina','Mina','Bjelica','2019-07-09','Gogoljeva 14','1','1','mina.bje96@gmail.com',NULL),(15,'a','Mina','Bjelica','2009-07-09','Gogoljeva 14','Hajde da putujemo zajedno!','a','mina.bje96@gmail.com',NULL),(19,'zoki','Zoran','Tucev','1995-07-25','Novi Sad','11','123','zoki@gmail.com','mz.jpeg'),(28,'mina.bje','Mina','Bjelica','2019-09-05','Novi Sad','Volim da putujem','1234','mina@gmail.com','20170720_085409.jpg');
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'travel'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2019-09-18 15:37:07
