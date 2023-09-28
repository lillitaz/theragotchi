package com.limako.theragotchi.repository;

import com.limako.theragotchi.model.Theragotchi;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TheragotchiRepository extends JpaRepository<Theragotchi,Long> {

}
