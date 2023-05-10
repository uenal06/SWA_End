package com.mustafa.fullstackbackend.repository;

import com.mustafa.fullstackbackend.model.Directory;
import com.mustafa.fullstackbackend.model.File;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;

public interface FileRepository extends JpaRepository<File, Long> {
    @Query("SELECT f FROM File f " +
            "JOIN Directory d ON f.directoryId = d.directoryId WHERE d.directoryId = :directoryId")
    List<File> getFilesFromDirectory(@Param("directoryId") Long directoryId);
}
