package com.mustafa.fullstackbackend.repository;

import com.mustafa.fullstackbackend.model.FileModel;
import com.mustafa.fullstackbackend.model.Sharing;
import com.mustafa.fullstackbackend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface SharingRepository extends JpaRepository<Sharing,Long> {
    @Query("SELECT u FROM User u " +
            "JOIN Sharing s ON u.userId = s.userId WHERE s.directoryId = :directoryId")
    List<User> findUsersByDirectoryId(@Param("directoryId") Long directoryId);

}
