package com.example.pos.repository;

import com.example.pos.entities.Bill;
import com.example.pos.entities.Shop;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDateTime;
import java.util.List;

public interface BillRepo extends JpaRepository<Bill,Long> {
    @Query("SELECT b FROM Bill b WHERE b.issuedIn=:shop AND b.issuedAt BETWEEN :from AND :to")
    List<Bill> findBillsBetweenDates(@Param("from") LocalDateTime from, @Param("to") LocalDateTime to, @Param("shop") Shop shop);

}
