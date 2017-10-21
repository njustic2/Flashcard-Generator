# Flashcard-Generator

This application uses the Terminal Window to create and review two types of flash cards.

The first type of flashcard is a basic question and answer format where the user is prompted to type out a question and then an answer. The user created flashcards are stored in a txt file.

The second style of flashcard is more complicated in that it redacts a portion of a statement for the user to guess later. In this case, the user is prompted to type in a full statement and then retype the section that they would like redacted. Like with the basic flashcard, the cards are stored in a txt for later recall.

When a user is reviewing previously generated flashcards. They are shown the question or statement with the redacted portion replaced with “…”. Then once they are ready, they are shown the answer or the full statement.

This application uses javascript, node.js, json, fileSystem, and inquirer for functionality and data storage.