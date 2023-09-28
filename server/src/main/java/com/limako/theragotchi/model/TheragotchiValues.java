package com.limako.theragotchi.model;

public enum TheragotchiValues {
    MAX_VALUE_STATES(5),
    MIN_VALUE_STATES(1),
    NUM_STATES(4),
    INCREASE_BY(2),
    DECREASE_BY(3);
    private final int value;

    TheragotchiValues(int value) {
        this.value = value;
    }

    public int getValue() {
        return value;
    }
}
