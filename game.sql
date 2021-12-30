SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";

--
-- Database: `game`
--

CREATE DATABASE game CHARACTER SET utf8 COLLATE utf8_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `player`
--

CREATE TABLE `player` (
  `id_player` int(10) NOT NULL,
  `username` varchar(20) NOT NULL,
  `password` varchar(8) NOT NULL,
  `name_player` varchar(50) NOT NULL,
  `creation_date` timestamp NULL DEFAULT current_timestamp(),
  `update_date` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `setting`
--

CREATE TABLE `setting` (
  `id_setting` int(10) NOT NULL,
  `sound` tinyint(1) NOT NULL,
  `music` tinyint(1) NOT NULL,
  `loudness_of_music` int(10) NOT NULL,
  `creation_date` timestamp NULL DEFAULT current_timestamp(),
  `update_date` timestamp NULL DEFAULT current_timestamp(),
  `id_player` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `detail`
--

CREATE TABLE `detail` (
  `id_detail` int(10) NOT NULL,
  `name_detail` varchar(50) NOT NULL,
  `information_detail` varchar(250) NOT NULL,
  `creation_date` timestamp NULL DEFAULT current_timestamp(),
  `update_date` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `detail`
--

INSERT INTO `detail` (`id_detail`, `name_detail`, `information_detail`, `creation_date`, `update_date`) VALUES
(1, 'HOW TO PLAY', 'Move Up\r\nMove to the right\r\nMove to the left\r\nMove Down', current_timestamp(), current_timestamp()),
(2, 'ENEMY', 'There is a monster that collects questions.', current_timestamp(), current_timestamp()),
(3, 'SCORE', 'Points are awarded for answering questions correctly and calculated from the remaining time.', current_timestamp(), current_timestamp());

-- --------------------------------------------------------

--
-- Table structure for table `education_level`
--

CREATE TABLE `education_level` (
  `id_education_level` int(10) NOT NULL,
  `name_education_level` varchar(100) NOT NULL,
  `creation_date` timestamp NULL DEFAULT current_timestamp(),
  `update_date` timestamp NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `education_level`
--

INSERT INTO `education_level` (`id_education_level`, `name_education_level`, `creation_date`, `update_date`) VALUES
(1, 'JUNIOR HIGH SCHOOL', current_timestamp(), current_timestamp()),
(2, 'SENIOR HIGH SCHOOL', current_timestamp(), current_timestamp());

-- --------------------------------------------------------

--
-- Table structure for table `subject`
--

CREATE TABLE `subject` (
  `id_subject` int(10) NOT NULL,
  `name_subject` varchar(100) NOT NULL,
  `creation_date` timestamp NULL DEFAULT current_timestamp(),
  `update_date` timestamp NULL DEFAULT current_timestamp(),
  `id_education_level` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `subject`
--

INSERT INTO `subject` (`id_subject`, `name_subject`, `creation_date`, `update_date`, `id_education_level`) VALUES
(1, 'DECIMALS AND FRACTIONS', current_timestamp(), current_timestamp(), 1),
(2, 'INTEGER SYSTEM', current_timestamp(), current_timestamp(), 1),
(3, 'EXPONENT', current_timestamp(), current_timestamp(), 1),
(4, 'SET', current_timestamp(), current_timestamp(), 2),
(5, 'TRIGONOMETRY RATIO', current_timestamp(), current_timestamp(), 2),
(6, 'FUNCTION', current_timestamp(), current_timestamp(), 2);

-- --------------------------------------------------------

--
-- Table structure for table `level`
--

CREATE TABLE `level` (
  `id_level` int(10) NOT NULL,
  `level_number` int(10) NOT NULL,
  `minute` int(10) NOT NULL,
  `second` int(10) NOT NULL,
  `creation_date` timestamp NULL DEFAULT current_timestamp(),
  `update_date` timestamp NULL DEFAULT current_timestamp(),
  `id_subject` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `level`
--

INSERT INTO `level` (`id_level`, `level_number`, `minute`, `second`, `creation_date`, `update_date`, `id_subject`) VALUES
(1, 1, 1, 0, current_timestamp(), current_timestamp(), 1),
(2, 2, 1, 30, current_timestamp(), current_timestamp(), 1),
(3, 3, 2, 0, current_timestamp(), current_timestamp(), 1),

(4, 1, 1, 0, current_timestamp(), current_timestamp(), 2),
(5, 2, 1, 30, current_timestamp(), current_timestamp(), 2),

(6, 1, 1, 0, current_timestamp(), current_timestamp(), 3),
(7, 2, 1, 30, current_timestamp(), current_timestamp(), 3),
(8, 3, 2, 0, current_timestamp(), current_timestamp(), 3),

(9, 1, 1, 0, current_timestamp(), current_timestamp(), 4),
(10, 2, 1, 30, current_timestamp(), current_timestamp(), 4),

(11, 1, 1, 0, current_timestamp(), current_timestamp(), 5),

(12, 1, 1, 0, current_timestamp(), current_timestamp(), 6),
(13, 2, 1, 30, current_timestamp(), current_timestamp(), 6);

-- --------------------------------------------------------

--
-- Table structure for table `question_answer`
--

CREATE TABLE `question_answer` (
  `id_question_answer` int(10) NOT NULL,
  `question` varchar(250) NOT NULL,
  `answer` int(10) NOT NULL,
  `creation_date` timestamp NULL DEFAULT current_timestamp(),
  `update_date` timestamp NULL DEFAULT current_timestamp(),
  `level_number` int(10) NOT NULL,
  `id_subject` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `question_answer`
--

INSERT INTO `question_answer` (`id_question_answer`, `question`, `answer`, `creation_date`, `update_date`, `level_number`, `id_subject`) VALUES
(1, 'ข้อใดต่อไปนี้มีค่ามากที่สุด', 1, current_timestamp(), current_timestamp(), 1, 1),
(2, 'ข้อใดถูกต้อง', 2, current_timestamp(), current_timestamp(), 2, 1),
(3, 'จำนวนในข้อใดเรียงจากน้อยไปมากได้ถูกต้อง', 3, current_timestamp(), current_timestamp(), 3, 1),

(4, '(-21) + (-15) มีค่าเท่าไร', 3, current_timestamp(), current_timestamp(), 1, 2),
(5, 'จำนวนใดเรียงจากมากไปน้อยได้ถูกต้อง', 3, current_timestamp(), current_timestamp(), 2, 2),

(6, 'ข้อใดมีค่าต่างจากข้ออื่น', 2, current_timestamp(), current_timestamp(), 1, 3),
(7, '((-4)^2) + (3^2) มีค่าเท่ากับข้อใด', 1, current_timestamp(), current_timestamp(), 2, 3),
(8, '(√9 + √16)^3', 2, current_timestamp(), current_timestamp(), 3, 3),

(9, 'กำหนดให้ A แทน เซตของจำนวนคี่ที่มากกว่า 4 แต่น้อยกว่า 14 และ ให้ B แทน เซตของจำนวนเฉพาะที่มากกว่า 4 แต่น้อยกว่า 14 ข้อใดเป็นสมาชิกของ A - B', 2, current_timestamp(), current_timestamp(), 1, 4),
(10, 'กำหนดให้ A, B และ C เป็นสับเซตที่ไม่เป็นเซตว่างของเอกภพสัมพัทธ์ U โดยที่ B ⊂ C และ A ∩ C = Ø ข้อใดถูก', 3, current_timestamp(), current_timestamp(), 2, 4),

(11, 'ข้อใดต่อไปนี้ถูกต้อง', 1, current_timestamp(), current_timestamp(), 1, 5),

(12, 'กำหนดให้ A = {1, 2} และ B = {a, b} คู่อันดับใดต่อไปนี้เป็นสามชิกของผลคูณคาร์ทีเซียน A × B', 2, current_timestamp(), current_timestamp(), 1, 6),
(13, 'ถ้า f = {(1, 0), (2, 1), (3, 5), (4, 6), (5, 2)} แล้ว f(2) + f(3) มีค่าตรงกับข้อใด', 1, current_timestamp(), current_timestamp(), 2, 6);

-- --------------------------------------------------------

--
-- Table structure for table `choice`
--

CREATE TABLE `choice` (
  `id_choice` int(10) NOT NULL,
  `choice_number` int(10) NOT NULL,
  `choice_question_answer` varchar(250) NOT NULL,
  `creation_date` timestamp NULL DEFAULT current_timestamp(),
  `update_date` timestamp NULL DEFAULT current_timestamp(),
  `id_question_answer` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `choice`
--

INSERT INTO `choice` (`id_choice`, `choice_number`, `choice_question_answer`, `creation_date`, `update_date`, `id_question_answer`) VALUES
(1, 1, '-12.0260', current_timestamp(), current_timestamp(), 1),
(2, 2, '-12.1026', current_timestamp(), current_timestamp(), 1),
(3, 3, '-12.1260', current_timestamp(), current_timestamp(), 1),
(4, 4, '-12.2160', current_timestamp(), current_timestamp(), 1),

(5, 1, '-1.340 < -1.430', current_timestamp(), current_timestamp(), 2),
(6, 2, '-0.530 < -0.350', current_timestamp(), current_timestamp(), 2),
(7, 3, '-5.220 > -5.200', current_timestamp(), current_timestamp(), 2),
(8, 4, '-13.412 > -3.241', current_timestamp(), current_timestamp(), 2),

(9, 1, '-3/7, -5/12, -4/9', current_timestamp(), current_timestamp(), 3),
(10, 2, '-4/9, -5/12, -3/7', current_timestamp(), current_timestamp(), 3),
(11, 3, '-4/9, -3/7, -5/12', current_timestamp(), current_timestamp(), 3),
(12, 4, '-5/12, -3/7, -4/9', current_timestamp(), current_timestamp(), 3),

(13, 1, '-6', current_timestamp(), current_timestamp(), 4),
(14, 2, '6', current_timestamp(), current_timestamp(), 4),
(15, 3, '-36', current_timestamp(), current_timestamp(), 4),
(16, 4, '36', current_timestamp(), current_timestamp(), 4),

(17, 1, '5, -10, -7, -5, -2', current_timestamp(), current_timestamp(), 5),
(18, 2, '-20, -17, -15, -10, -2', current_timestamp(), current_timestamp(), 5),
(19, 3, '20, 7, -19, -30, -40', current_timestamp(), current_timestamp(), 5),
(20, 4, '0, -9, -7, -1, 2', current_timestamp(), current_timestamp(), 5),

(21, 1, '(-1)^0', current_timestamp(), current_timestamp(), 6),
(22, 2, '(-1)^(0.2)', current_timestamp(), current_timestamp(), 6),
(23, 3, '(-1)^(0.4)', current_timestamp(), current_timestamp(), 6),
(24, 4, '(-1)^(0.8)', current_timestamp(), current_timestamp(), 6),

(25, 1, '25', current_timestamp(), current_timestamp(), 7),
(26, 2, '-25', current_timestamp(), current_timestamp(), 7),
(27, 3, '7', current_timestamp(), current_timestamp(), 7),
(28, 4, '-7', current_timestamp(), current_timestamp(), 7),

(29, 1, '-343', current_timestamp(), current_timestamp(), 8),
(30, 2, '343', current_timestamp(), current_timestamp(), 8),
(31, 3, '-348', current_timestamp(), current_timestamp(), 8),
(32, 4, '348', current_timestamp(), current_timestamp(), 8),

(33, 1, '5', current_timestamp(), current_timestamp(), 9),
(34, 2, '9', current_timestamp(), current_timestamp(), 9),
(35, 3, '7', current_timestamp(), current_timestamp(), 9),
(36, 4, '11', current_timestamp(), current_timestamp(), 9),

(37, 1, 'A ∩ B = B ∩ C', current_timestamp(), current_timestamp(), 10),
(38, 2, '(A ∩ B) U C = Ø', current_timestamp(), current_timestamp(), 10),
(39, 3, '(A U B) ∩ C = B', current_timestamp(), current_timestamp(), 10),
(40, 4, 'A ー B = Cー B', current_timestamp(), current_timestamp(), 10),

(41, 1, 'sin 30° < sin 45°', current_timestamp(), current_timestamp(), 11),
(42, 2, 'cos 30° < cos 45°', current_timestamp(), current_timestamp(), 11),
(43, 3, 'tan 45° < cot 45°', current_timestamp(), current_timestamp(), 11),
(44, 4, 'tan 60° < cot 60°', current_timestamp(), current_timestamp(), 11),

(45, 1, '(b, a)', current_timestamp(), current_timestamp(), 12),
(46, 2, '(2, b)', current_timestamp(), current_timestamp(), 12),
(47, 3, '(a, 1)', current_timestamp(), current_timestamp(), 12),
(48, 4, '(1, 2)', current_timestamp(), current_timestamp(), 12),

(49, 1, '6', current_timestamp(), current_timestamp(), 13),
(50, 2, '-6', current_timestamp(), current_timestamp(), 13),
(51, 3, '5', current_timestamp(), current_timestamp(), 13),
(52, 4, '-5', current_timestamp(), current_timestamp(), 13);

-- --------------------------------------------------------

--
-- Table structure for table `score`
--

CREATE TABLE `score` (
  `id_score` int(10) NOT NULL,
  `score` int(10) NOT NULL,
  `creation_date` timestamp NULL DEFAULT current_timestamp(),
  `update_date` timestamp NULL DEFAULT current_timestamp(),
  `id_player` int(10) NOT NULL,
  `id_level` int(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Indexes for dumped tables
--

--
-- Indexes for table `choice`
--
ALTER TABLE `choice`
  ADD PRIMARY KEY (`id_choice`),
  ADD KEY `FK_question_answer_choice` (`id_question_answer`);

--
-- Indexes for table `detail`
--
ALTER TABLE `detail`
  ADD PRIMARY KEY (`id_detail`),
  ADD UNIQUE KEY `name_detail` (`name_detail`);

--
-- Indexes for table `education_level`
--
ALTER TABLE `education_level`
  ADD PRIMARY KEY (`id_education_level`),
  ADD UNIQUE KEY `name_education_level` (`name_education_level`);

--
-- Indexes for table `level`
--
ALTER TABLE `level`
  ADD PRIMARY KEY (`id_level`),
  ADD KEY `level_number` (`level_number`),
  ADD KEY `FK_subject_level` (`id_subject`);

--
-- Indexes for table `player`
--
ALTER TABLE `player`
  ADD PRIMARY KEY (`id_player`),
  ADD UNIQUE KEY `username` (`username`);

--
-- Indexes for table `question_answer`
--
ALTER TABLE `question_answer`
  ADD PRIMARY KEY (`id_question_answer`),
  ADD UNIQUE KEY `question` (`question`),
  ADD KEY `FK_level_question_answer` (`level_number`),
  ADD KEY `FK_subject_question_answer` (`id_subject`);

--
-- Indexes for table `score`
--
ALTER TABLE `score`
  ADD PRIMARY KEY (`id_score`),
  ADD KEY `FK_player_score` (`id_player`),
  ADD KEY `FK_level_score` (`id_level`);

--
-- Indexes for table `setting`
--
ALTER TABLE `setting`
  ADD PRIMARY KEY (`id_setting`),
  ADD UNIQUE KEY `FK_player_setting` (`id_player`);

--
-- Indexes for table `subject`
--
ALTER TABLE `subject`
  ADD PRIMARY KEY (`id_subject`),
  ADD UNIQUE KEY `name_subject` (`name_subject`),
  ADD KEY `FK_education_level_subject` (`id_education_level`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `choice`
--
ALTER TABLE `choice`
  MODIFY `id_choice` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=53;

--
-- AUTO_INCREMENT for table `detail`
--
ALTER TABLE `detail`
  MODIFY `id_detail` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `education_level`
--
ALTER TABLE `education_level`
  MODIFY `id_education_level` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `level`
--
ALTER TABLE `level`
  MODIFY `id_level` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `player`
--
ALTER TABLE `player`
  MODIFY `id_player` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;

--
-- AUTO_INCREMENT for table `question_answer`
--
ALTER TABLE `question_answer`
  MODIFY `id_question_answer` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `score`
--
ALTER TABLE `score`
  MODIFY `id_score` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;

--
-- AUTO_INCREMENT for table `setting`
--
ALTER TABLE `setting`
  MODIFY `id_setting` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=1;

--
-- AUTO_INCREMENT for table `subject`
--
ALTER TABLE `subject`
  MODIFY `id_subject` int(10) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `choice`
--
ALTER TABLE `choice`
  ADD CONSTRAINT `FK_question_answer_choice` FOREIGN KEY (`id_question_answer`) REFERENCES `question_answer` (`id_question_answer`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `level`
--
ALTER TABLE `level`
  ADD CONSTRAINT `FK_subject_level` FOREIGN KEY (`id_subject`) REFERENCES `subject` (`id_subject`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `question_answer`
--
ALTER TABLE `question_answer`
  ADD CONSTRAINT `FK_level_question_answer` FOREIGN KEY (`level_number`) REFERENCES `level` (`level_number`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_subject_question_answer` FOREIGN KEY (`id_subject`) REFERENCES `subject` (`id_subject`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `score`
--
ALTER TABLE `score`
  ADD CONSTRAINT `FK_level_score` FOREIGN KEY (`id_level`) REFERENCES `level` (`id_level`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `FK_player_score` FOREIGN KEY (`id_player`) REFERENCES `player` (`id_player`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `setting`
--
ALTER TABLE `setting`
  ADD CONSTRAINT `FK_player_setting` FOREIGN KEY (`id_player`) REFERENCES `player` (`id_player`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `subject`
--
ALTER TABLE `subject`
  ADD CONSTRAINT `FK_education_level_subject` FOREIGN KEY (`id_education_level`) REFERENCES `education_level` (`id_education_level`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;
