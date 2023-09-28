package com.limako.theragotchi.model;
public enum ImagePath {
    IMAGE_SAD("../ImagesTheragotchi/Sad-Emoji.png"),
    IMAGE_MEDIUM("../ImagesTheragotchi/Neutral-Emoji.png"),
    IMAGE_HAPPY("../ImagesTheragotchi/Happy-Emoji.png");
    private final String path;
    ImagePath(String path) {
        this.path = path;
    }

    public String getPath() {
        return path;
    }
    }



