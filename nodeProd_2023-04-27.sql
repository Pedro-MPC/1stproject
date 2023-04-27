# ************************************************************
# Sequel Ace SQL dump
# Versão 20046
#
# https://sequel-ace.com/
# https://github.com/Sequel-Ace/Sequel-Ace
#
# Servidor: localhost (MySQL 5.5.5-10.4.28-MariaDB)
# Banco de Dados: nodeProd
# Tempo de geração: 2023-04-27 08:50:30 +0000
# ************************************************************


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
SET NAMES utf8mb4;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE='NO_AUTO_VALUE_ON_ZERO', SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


# Dump de tabela category
# ------------------------------------------------------------

DROP TABLE IF EXISTS `category`;

CREATE TABLE `category` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `descCat` varchar(255) DEFAULT NULL,
  `imgCat` text DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

LOCK TABLES `category` WRITE;
/*!40000 ALTER TABLE `category` DISABLE KEYS */;

INSERT INTO `category` (`id`, `descCat`, `imgCat`)
VALUES
	(1,'Smarthones','img/categories/phone-cat.png'),
	(2,'Laptops','img/categories/computer-cat.png'),
	(3,'Kitchen','img/categories/kitchen-cat.png'),
	(4,'Smart Home','img/categories/smarthome-cat.png'),
	(5,'TV','img/categories/tv-cat.png'),
	(6,'Desktops','img/categories/desktop-cat.png'),
	(7,'Gaming','img/categories/gaming-cat.png'),
	(8,'Health','img/categories/health-cat.png'),
	(9,'Fashion','img/categories/clothes-cat.png'),
	(10,'Books','img/categories/books-cat.png'),
	(11,'Music','img/categories/music-cat.png'),
	(12,'Events','img/categories/tickets-cat.png');

/*!40000 ALTER TABLE `category` ENABLE KEYS */;
UNLOCK TABLES;


# Dump de tabela customer
# ------------------------------------------------------------

DROP TABLE IF EXISTS `customer`;

CREATE TABLE `customer` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(255) NOT NULL,
  `dtAdd` date DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `fname` varchar(255) DEFAULT NULL,
  `lname` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`email`),
  KEY `id` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

LOCK TABLES `customer` WRITE;
/*!40000 ALTER TABLE `customer` DISABLE KEYS */;

INSERT INTO `customer` (`id`, `email`, `dtAdd`, `password`, `fname`, `lname`)
VALUES
	(1,'mail','2023-03-27','8fe4c11451281c094a6578e6ddbf5eed','Pedro','Correia'),
	(13,'mail1','2023-04-20','8fe4c11451281c094a6578e6ddbf5eed','Pedro','Teste');

/*!40000 ALTER TABLE `customer` ENABLE KEYS */;
UNLOCK TABLES;


# Dump de tabela orders
# ------------------------------------------------------------

DROP TABLE IF EXISTS `orders`;

CREATE TABLE `orders` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `address` varchar(255) DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  `order_date` datetime DEFAULT NULL,
  `customer_fname` varchar(255) DEFAULT NULL,
  `customer_lname` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `status` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;

INSERT INTO `orders` (`id`, `address`, `city`, `order_date`, `customer_fname`, `customer_lname`, `email`, `status`)
VALUES
	(1,'address','city',NULL,'pedro','correia','mail',3),
	(2,'asd','asd',NULL,'order','2','mail',2),
	(3,'asd','asd',NULL,'order','3','mail',3),
	(39,'Capgemini','Évora','2023-04-20 14:28:05','Pedro','Correia','mail',2),
	(41,'Rua de Cima','Arraiolos','2023-04-20 14:55:07','Pedro','Correia','mail',1),
	(42,'Capgemini','Évora','2023-04-20 15:54:10','Pedro','Correia','mail',3),
	(43,'asd','asd','2023-04-20 15:56:13','Pedro','Correia','mail',1),
	(44,'Top Street','City Hor','2023-04-22 13:02:03','Pedro','Correia','mail',1),
	(45,'asdasd','asd','2023-04-23 23:06:32','Pedro','Correia','mail',1),
	(46,'Rua de Évora','Évora','2023-04-26 18:25:57','Catarina ','Ferreira','catarinamail',1);

/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;


# Dump de tabela orders_products
# ------------------------------------------------------------

DROP TABLE IF EXISTS `orders_products`;

CREATE TABLE `orders_products` (
  `order_id` int(11) DEFAULT NULL,
  `product_id` int(11) DEFAULT NULL,
  `quantity` int(11) DEFAULT NULL,
  KEY `product_id` (`product_id`),
  KEY `orders_products_ibfk_1` (`order_id`),
  CONSTRAINT `orders_products_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`id`) ON DELETE CASCADE,
  CONSTRAINT `orders_products_ibfk_2` FOREIGN KEY (`product_id`) REFERENCES `products` (`_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

LOCK TABLES `orders_products` WRITE;
/*!40000 ALTER TABLE `orders_products` DISABLE KEYS */;

INSERT INTO `orders_products` (`order_id`, `product_id`, `quantity`)
VALUES
	(2,1,1),
	(3,2,1),
	(1,3,2),
	(39,1,1),
	(39,2,1),
	(39,3,1),
	(39,4,1),
	(39,5,1),
	(39,6,1),
	(41,2,1),
	(41,1,1),
	(41,3,1),
	(42,2,4),
	(42,1,3),
	(42,3,697),
	(43,2,1),
	(43,1,1),
	(44,2,1),
	(44,1,1),
	(44,3,1),
	(45,1,1),
	(45,2,1),
	(45,4,1),
	(45,5,1),
	(45,6,1),
	(46,7,1);

/*!40000 ALTER TABLE `orders_products` ENABLE KEYS */;
UNLOCK TABLES;


# Dump de tabela products
# ------------------------------------------------------------

DROP TABLE IF EXISTS `products`;

CREATE TABLE `products` (
  `_id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `img` text DEFAULT NULL,
  `desc` text DEFAULT NULL,
  `preco` double DEFAULT NULL,
  `isFeatured` tinyint(1) DEFAULT NULL,
  `online` tinyint(1) DEFAULT NULL,
  PRIMARY KEY (`_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;

INSERT INTO `products` (`_id`, `name`, `img`, `desc`, `preco`, `isFeatured`, `online`)
VALUES
	(1,'iPhone 14 Pro Max ','https://www.worten.pt/i/b6f517b0f1f5b9ca31d353129411f52eba20b1ae.jpg','Chegou uma nova forma mágica de usar o iPhone. Combinada com funcionalidades de segurança pensadas para salvar vidas e a inovadora câmara de 48 MP que revela níveis de detalhe impressionantes. Tudo com a incrível potência do mais avançado processador de smartphone. É um Pro de verdade.',1500,1,1),
	(2,'Portátil HP 15s-FQ5012NP','https://www.worten.pt/i/baaff281b97c7043c5784470840c9f3d6ff142e9.jpg','Faça o que tem a fazer durante todo o dia, e onde preferir fazê-lo, com o portátil HP de 15,6 polegadas que apresenta uma construção leve e uma bateria de longa duração. Desfrute de uma experiência de computação confortável num ecrã anticintilação e usufrua do desempenho fiável do processador Intel® Core™. Além disso, criado com o meio ambiente em mente, este portátil apresenta registo EPEAT® Silver e certificação ENERGY STAR®. Superportátil, construção leve e uma experiência de visualização mais confortável num ecrã anticintilação de moldura fina. Realize as tarefas diárias com facilidade graças ao processador Intel® Core™ e ao armazenamento abundante do portátil. ',599.99,0,1),
	(3,'iMac APPLE MGPC3PO/A','https://www.worten.pt/i/d762ee55d47fd63de9ec4c6e79b49d01b7746df5.jpg','Medido na diagonal, o tamanho da tela do Galaxy S23 é de 6,1 polegadas no retângulo completo e 5,9 polegadas considerando os cantos arredondados. O tamanho da tela do Galaxy S23+ é de 6,6 polegadas no retângulo completo e 6,4 polegadas considerando os cantos arredondados. O tamanho da tela do Galaxy S23 Ultra é de 6,8 polegadas no retângulo completo e 6,8 polegadas considerando os cantos arredondados A área visível real é menor devido aos cantos arredondados e à captura do dispositivo.\n\n',1579.99,0,0),
	(4,'Galaxy S23 Ultra','https://www.worten.pt/i/c26cbce688f7eab6df764623935a9fa3a3b12bb6.jpg','Medido na diagonal, o tamanho da tela do Galaxy S23 é de 6,1 polegadas no retângulo completo e 5,9 polegadas considerando os cantos arredondados. O tamanho da tela do Galaxy S23+ é de 6,6 polegadas no retângulo completo e 6,4 polegadas considerando os cantos arredondados. O tamanho da tela do Galaxy S23 Ultra é de 6,8 polegadas no retângulo completo e 6,8 polegadas considerando os cantos arredondados A área visível real é menor devido aos cantos arredondados e à captura do dispositivo.\n\n',1249.99,1,1),
	(5,'Frigideira Antiaderente JOMAFE Forest','https://www.worten.pt/i/827904516682e059d03aaf511c0c9dfa00a766ea.jpg','*Recebe já amanhã onde quiseres. Entrega gratuita no dia útil seguinte válida para encomendas pagas até às 16h, nos artigos ‘Deal of the Day’. Em grandes eletrodomésticos e artigos de Vendedores Marketplace a entrega está sujeita a disponibilidade de agendamento/entrega.\n\n',24.2,1,1),
	(6,'Spotify Gift Card','https://www.worten.pt/i/81e8246cdaf4eed14f54e23a188b49ec0e4185f7','Use our gift cards to redeem time on an individual Premium plan - to continue paying for one, or upgrade from a free account\nNote: You can’t apply a gift card on discounted plans like Premium Student, Premium Family, Premium Duo, or trial offers.\nBuy a gift card from leading electronic and retail stores - in 1, 3, 6, and 12-month values',14.99,0,0),
	(7,'TV LG OLED65A26LA (OLED - 65\'\' - 165 cm - 4K Ultra HD - Smart TV) ','https://www.worten.pt/i/3ddec20f8824691c13e536b7bf167b5ee715424b.jpg','Os píxeis da LG OLED iluminam-se de forma independente, pelo que não necessitam de um sistema de retroiluminação que ofusque o seu brilho. Agora, as áreas mais escuras ficam realmente negras, sem intromissão de luz, nem efeito de halo. Desfrute de uma imagem nítida com uma profundidade sem paralelo.',1199,0,1);

/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;


# Dump de tabela products_categories
# ------------------------------------------------------------

DROP TABLE IF EXISTS `products_categories`;

CREATE TABLE `products_categories` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_product` int(11) DEFAULT NULL,
  `id_category` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `id_category` (`id_category`),
  KEY `id_product` (`id_product`),
  CONSTRAINT `products_categories_ibfk_1` FOREIGN KEY (`id_category`) REFERENCES `category` (`id`),
  CONSTRAINT `products_categories_ibfk_2` FOREIGN KEY (`id_product`) REFERENCES `products` (`_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

LOCK TABLES `products_categories` WRITE;
/*!40000 ALTER TABLE `products_categories` DISABLE KEYS */;

INSERT INTO `products_categories` (`id`, `id_product`, `id_category`)
VALUES
	(1,1,1),
	(3,3,6),
	(4,2,2),
	(6,4,1),
	(7,5,3),
	(10,6,11),
	(11,7,5);

/*!40000 ALTER TABLE `products_categories` ENABLE KEYS */;
UNLOCK TABLES;



/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
